package com.example.hdt.ServiceImpl;

import com.example.hdt.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TherapistImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @Autowired
    private PatientImpl patientimlpl;


    public static RedisDao<Therapist> cacheTherapist;
    private static final String REDIS_KEY = "CurrentTherapist:%s";

//    public static Therapist curTherapist = new Therapist();

    @Autowired
    public TherapistImpl(RedisDao<Therapist> cacheTherapist) {
        this.cacheTherapist = cacheTherapist;
    }
//    getActivityPatient
    @Cacheable(value = "activePatients",key = "#email")
    public List<Patient> findAllAcitvePatient(String email){
        Query query = new Query(Criteria.where("Email").is(email));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
        String redisKey = String.format(REDIS_KEY,email);
        cacheTherapist.setRedis(redisKey,t);
        List<String> activePatientsId = t.getActivePatients();
        System.out.println("fetch from database");
        return getActivePaitents(activePatientsId);
    }

    @CacheEvict(value = "activePatients",allEntries = true)
    public void addPatientsList(Patient patient, String email){
        Query query = new Query(Criteria.where("email").is(email));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
        Query query1 = new Query(Criteria.where("Email").is(patient.getContact().getEmail()));
        Caregiver c = mongoTemplate.findOne(query1,Caregiver.class);

        if (patient.getPatientID()==null && patient.getId()==null) {
            patient.setPatientID("PAT-" + patientimlpl.uniqueId());
            //add corresponding id to patient therapist and caregiver
            patient.addTherapists(t.getTherapistID());
            t.addActivePatients(patient.getPatientID());
            if (c!=null){
                patient.setCaregivers(c.getCaregiverID());
                c.setPatientID(patient.getPatientID());
                Update update = new Update().set("PatientID",patient.getPatientID());
                mongoTemplate.updateFirst(query1,update,Caregiver.class);
            }

//            new thumbs obeject fot therapist
            Thumbs thumbs = new Thumbs();
            thumbs.setId(patient.getPatientID());
            t.getThumbs().add(thumbs);
            Update update1 = new Update().set("activePatients",t.getActivePatients()).push("thumbs",thumbs);
            mongoTemplate.updateFirst(query,update1,Therapist.class);

            patient.setThumbs(0);
            patientimlpl.insertPatient(patient);
        }else {
            if (c!=null){
                patient.setCaregivers(c.getCaregiverID());
                c.setPatientID(patient.getPatientID());
                Update update = new Update().set("PatientID",patient.getPatientID());
                mongoTemplate.updateFirst(query1,update,Caregiver.class);
            }

            System.out.println(patient.toString());
            patientimlpl.savePatient(patient);
        }
    }

    @CacheEvict(value = "activePatients",allEntries = true)
    public void updateThumbsUp( String id, int count, String email){
        Query query = new Query(Criteria.where("email").is(email).and("thumbs.id").is(id));
        Update update = new Update().set("thumbs.$.thumbsCount",count);
        mongoTemplate.updateFirst(query,update,Therapist.class);
        patientimlpl.updateThumbs(id,count);

    }

    public List<Patient> getActivePaitents(List<String> activePatientsId){
        List<Patient> activePatient = new ArrayList<>();
        for (String patientId: activePatientsId) {
            Patient p = patientimlpl.findPatientByPatientId(patientId);
            if (p!= null){
                if (!patientimlpl.cacheTask.hasKey(patientId) || patientimlpl.cacheTask.get(patientId).equals("updateTask")) {
                    patientimlpl.cacheTask.setRedis(patientId, "setTask");
                    //calculate the total exercise hours
                    //now is minutes
                    //update in p and database
                    double totalTime = (double) p.getTasks().stream().mapToInt(Tasks::getSpentTime).sum();
                    double totalHour = Math.floor(totalTime / 60.0 * 10) / 10.0;
                    //                temporary fix for week hour
                    double weekHour = Math.floor(totalHour * 2 / 5.0 * 10) / 10.0;;
                    p.setTotalExerciseHours(totalHour);
                    p.setWeekExerciseHours(weekHour);
                    patientimlpl.updateTotalHour(patientId, totalHour, weekHour);
                }
                activePatient.add(p);
            }
        }
        return activePatient;
    }

    public Therapist findTherapistByTherapistID(String therapistID){
        Query query = new Query(Criteria.where("TherapistID").is(therapistID));
        Therapist therapist = mongoTemplate.findOne(query,Therapist.class);
        return therapist;
    }






}

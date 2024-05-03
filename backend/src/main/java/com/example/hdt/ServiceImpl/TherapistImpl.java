package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.RedisDao;
import com.example.hdt.models.Therapist;
import com.example.hdt.models.Thumbs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TherapistImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @Autowired
    private PatientImpl patientimlpl;

    public static RedisDao<Patient> cachePatients;

    public static Therapist curTherapist = new Therapist();

    @Autowired
    public TherapistImpl(RedisDao<Patient> cachePatients) {
        this.cachePatients = cachePatients;
    }
//    getActivityPatient
    @Cacheable(value = "activePatients",key = "#email")
    public List<Patient> findAllAcitvePatient(String email){
        Query query = new Query(Criteria.where("Email").is(email));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
        curTherapist.setEmail(t.getEmail());
        curTherapist.setTherapistID(t.getTherapistID());
        for (Thumbs thumb:
             t.getThumbs()) {
            curTherapist.getThumbs().add(thumb);
        }
//        curTherapist.getThumbs().forEach(System.out::print);
        List<String> activePatientsId = t.getActivePatients();
        System.out.println("fetch from database");
        return getActivePaitents(activePatientsId);
    }

    @CacheEvict(value = "activePatients",allEntries = true)
    public void addPatientsList(Patient patient, String email){
        Query query = new Query(Criteria.where("email").is(email));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
        if (patient.getPatientID()==null && patient.getId()==null) {
            patient.setPatientID("PAT-" + patientimlpl.uniqueId());
            patient.addTherapists(t.getTherapistID());
            t.addActivePatients(patient.getPatientID());

//            new thumbs obeject fot therapist
            Thumbs thumbs = new Thumbs();
            thumbs.setId(patient.getPatientID());
            t.getThumbs().add(thumbs);
            Update update = new Update().set("activePatients",t.getActivePatients()).push("thumbs",thumbs);
            mongoTemplate.updateFirst(query,update,Therapist.class);

            patient.setThumbs(0);
            patientimlpl.insertPatient(patient);
        }else {
            System.out.println(patient.toString());
            patientimlpl.savePatient(patient);
        }
    }

    @CacheEvict(value = "activePatients",allEntries = true)
    public void updateThumbsUp( String id, int count){
        Query query = new Query(Criteria.where("email").is(curTherapist.getEmail()).and("thumbs.id").is(id));
        Update update = new Update().set("thumbs.$.thumbsCount",count);
        mongoTemplate.updateFirst(query,update,Therapist.class);
        patientimlpl.updateThumbs(id,count);

    }

    public List<Patient> getActivePaitents(List<String> activePatientsId){
        List<Patient> activePatient = new ArrayList<>();
        for (String patientId: activePatientsId) {
            Patient p = patientimlpl.findPatientByPatientId(patientId);
            if (p!= null){
                activePatient.add(p);
            }
        }
        return activePatient;
    }






}

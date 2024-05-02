package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.RedisDao;
import com.example.hdt.models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
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

    @Autowired
    public TherapistImpl(RedisDao<Patient> cachePatients) {
        this.cachePatients = cachePatients;
    }
//    getActivityPatient
    @Cacheable(value = "activePatients",key = "#email")
    public List<Patient> findAllAcitvePatient(String email){
        Query query = new Query(Criteria.where("Email").is(email));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
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
            Update update = new Update().set("activePatients",t.getActivePatients());
            mongoTemplate.updateFirst(query,update,Therapist.class);
            patientimlpl.insertPatient(patient);
        }else {
            System.out.println(patient.toString());
            patientimlpl.savePatient(patient);
        }
    }



    public List<Patient> getActivePaitents(List<String> activePatientsId){
        List<Patient> activePatient = new ArrayList<>();
        for (String patientId: activePatientsId) {
            Patient p = patientimlpl.findPatientByPatientId(patientId);
            if (p!= null){
                activePatient.add(p);
            }
        }
//        if (!activePatient.isEmpty()){
//            cachePatients.setRedisList(activePatientsId,activePatient);
//        }
        return activePatient;
    }


}

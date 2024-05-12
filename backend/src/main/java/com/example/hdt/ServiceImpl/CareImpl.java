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

@Repository
public class CareImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @Autowired
    private PatientImpl patientimlpl;

    @Autowired
    private TherapistImpl therapistImpl;


    public static RedisDao<Caregiver> cacheCaregiver;
    private static final String REDIS_KEY = "CurrentCaregiver";

    @Autowired
    public CareImpl(RedisDao<Caregiver> cacheCaregiver) {
        this.cacheCaregiver = cacheCaregiver;
    }



    @Cacheable(value = "Caregivers", key = "#caregiverEmail")
    public Combo findCare(String caregiverEmail){
        Combo combo = new Combo();
        Query query = new Query(Criteria.where("Email").is(caregiverEmail));
        Caregiver caregiver = mongoTemplate.findOne(query, Caregiver.class);
        if (!cacheCaregiver.hasKey(REDIS_KEY)){
            cacheCaregiver.setRedis(REDIS_KEY,caregiver);
        }
        //find care patient
        Patient carePatient = patientimlpl.findPatientByPatientId(caregiver.getPatientID());
        //find care patient's therapist
        Therapist therapist = therapistImpl.findTherapistByTherapistID(carePatient.getTherapists());
        combo.setCarePatient(carePatient);
        combo.setTherapist(therapist);
        return combo;
    }


    @CacheEvict(value = "Caregivers",allEntries = true)
    public int getcarePatientThumbs(){
        Caregiver caregiver = (Caregiver) cacheCaregiver.get(REDIS_KEY);
        Patient carePatient = patientimlpl.findPatientByPatientId(caregiver.getPatientID());
        carePatient.setThumbs_caregivers(carePatient.getThumbs_caregivers()+1);
        Query query = new Query(Criteria.where("PatientID").is(caregiver.getPatientID()));
        Update update = new Update().set("thumbs_caregivers",carePatient.getThumbs_caregivers());
        mongoTemplate.updateFirst(query,update,Patient.class);
        return carePatient.getThumbs_caregivers();
    }



}

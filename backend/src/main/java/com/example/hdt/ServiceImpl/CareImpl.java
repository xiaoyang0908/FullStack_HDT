package com.example.hdt.ServiceImpl;


import com.example.hdt.models.Caregiver;
import com.example.hdt.models.Combo;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
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

    private static String curPatientID;


    @Cacheable(value = "Caregivers", key = "#caregiverEmail")
    public Combo findCare(String caregiverEmail){
        Combo combo = new Combo();
        Query query = new Query(Criteria.where("Email").is(caregiverEmail));
        Caregiver caregiver = mongoTemplate.findOne(query, Caregiver.class);
        //find care patient
        Patient carePatient = patientimlpl.findPatientByPatientId(caregiver.getPatientID());
        curPatientID = carePatient.getPatientID();
        System.out.println(curPatientID);
        if (carePatient.getCaregivers()==null) {
            carePatient.setCaregivers(caregiver.getCaregiverID());
            Query query1 = new Query(Criteria.where("PatientID").is(carePatient.getPatientID()));
            Update update = new Update().set("Caregivers",carePatient.getCaregivers());
            mongoTemplate.updateFirst(query1,update,Patient.class);
        }

        //find care patient's therapist
        Therapist therapist = therapistImpl.findTherapistByTherapistID(carePatient.getTherapists());
        combo.setCarePatient(carePatient);
        combo.setTherapist(therapist);
        return combo;
    }


    @CacheEvict(value = "Caregivers",allEntries = true)
    public int getcarePatientThumbs(){
        System.out.println(curPatientID);
        Patient carePatient = patientimlpl.findPatientByPatientId(curPatientID);
        carePatient.setThumbs_caregivers(carePatient.getThumbs_caregivers()+1);
        Query query = new Query(Criteria.where("PatientID").is(curPatientID));
        Update update = new Update().set("thumbs_caregivers",carePatient.getThumbs_caregivers());
        mongoTemplate.updateFirst(query,update,Patient.class);
        return carePatient.getThumbs_caregivers();
    }


}

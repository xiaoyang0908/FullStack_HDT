package com.example.hdt.ServiceImpl;


import com.example.hdt.models.Caregiver;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class CareImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @Autowired
    private PatientImpl patientimlpl;

    @Autowired
    private TherapistImpl therapistImpl;

    public Patient findCarePatient(String caregiverEmail){
        Query query = new Query(Criteria.where("Email").is(caregiverEmail));
        Caregiver caregiver = mongoTemplate.findOne(query, Caregiver.class);
        Patient carePatient = patientimlpl.findPatientByPatientId(caregiver.getPatientID());
        return carePatient;
    }

    public Therapist findCareTherapist(String caregiverEmail){
        Query query = new Query(Criteria.where("Email").is(caregiverEmail));
        Caregiver caregiver = mongoTemplate.findOne(query, Caregiver.class);
        Patient carePatient = patientimlpl.findPatientByPatientId(caregiver.getPatientID());
        Therapist therapist = therapistImpl.findTherapistByTherapistID(carePatient.getTherapists());
        return therapist;
    }

}

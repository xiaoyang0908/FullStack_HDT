package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TherapistImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @Autowired
    private PatientImpl patientimlpl;

//    getActivityPatient
    public List<Patient> findAllAcitvePatient(String id){
        List<Patient> activePatient = new ArrayList<>();
        Query query = new Query(Criteria.where("id").is(id));
        Therapist t = mongoTemplate.findOne(query,Therapist.class);
        List<String> activePatientsId = t.getActivePatients();
        for (String patientId: activePatientsId) {
            Patient p = patientimlpl.findPatientById(patientId);
            if (p!= null){
                activePatient.add(p);
            }
        }
        return activePatient;
    }


}

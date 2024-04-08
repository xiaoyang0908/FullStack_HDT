package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public class PatientImpl{
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    //    get user
    public Patient findPatientById(String id){
        Query query = new Query(Criteria.where("PatientId").is(id));
        return mongoTemplate.findOne(query,Patient.class);
    }

    public List<Patient> getPatientList(){
        return mongoTemplate.findAll(Patient.class);
    }
    //    update
    public void updatePatient(Patient patient){
        Query query = new Query(Criteria.where("PatientId").is(patient.getPatientID()));
        Update update = new Update().set("photo",patient.getPhoto());
        mongoTemplate.updateFirst(query,update,Patient.class);

    }
}
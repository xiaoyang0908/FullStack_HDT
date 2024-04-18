package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.Tasks;
import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Repository
public class PatientImpl{
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    public String uniqueId(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    //    get user
    public Patient findPatientByPatientId(String patientId){
        Query query = new Query(Criteria.where("patientID").is(patientId));
        return mongoTemplate.findOne(query,Patient.class);
    }

    public List<Patient> getPatientList(){
        return mongoTemplate.findAll(Patient.class);
    }

    //    insert Tasks
    public void insertTasks(String id, Tasks task){
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().push("tasks",task);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }

    // update tasks
    public void updateTasks(String id, ArrayList<Tasks> tasks){
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().set("tasks",tasks);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }


}
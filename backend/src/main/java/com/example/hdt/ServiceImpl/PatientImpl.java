package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.models.Performance;
import com.example.hdt.models.Tasks;
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
    public Patient findPatientByEmail(String email){
        Query query = new Query(Criteria.where("email").is(email));
        return mongoTemplate.findOne(query,Patient.class);
    }

//    save patient
    public void savePatient(Patient patient){
        mongoTemplate.save(patient,"patientProfile");
    }
    //inset patient
    public  void insertPatient(Patient patient){
        mongoTemplate.insert(patient,"patientProfile");
    }


    @Cacheable(value = "AllPatient")
    public List<Patient> getPatientList(){
        List<Patient> patients= mongoTemplate.findAll(Patient.class);
        List<String> patientIds = new ArrayList<>();
        for (Patient p:
                patients) {
            patientIds.add(p.getPatientID());
        }
//        TherapistImpl.cachePatients.setRedisList(patientIds,patients);
        return patients;
    }


    //    insert Tasks
    @CacheEvict(value = "activePatients",allEntries = true)
    public void insertTasks(String id, Tasks task){
//        System.out.println(TherapistImpl.therapistEmail);
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().push("tasks",task);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }

    // update tasks
    @CacheEvict(value = "activePatients",allEntries = true)
    public void updateTasks(String id, ArrayList<Tasks> tasks){
//        System.out.println(TherapistImpl.therapistEmail);
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().set("tasks",tasks);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }


    //update thumbs count
    @CacheEvict(value = "activePatients",allEntries = true)
    public void updateThumbs(String id, int count){
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().set("thumbs",count);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }

    @CacheEvict(value = "activePatients",allEntries = true)
    public void updatePerformance(String id, List<Performance> performanceList){
        Query query = new Query(Criteria.where("PatientID").is(id));
        Update update = new Update().set("performance",performanceList);
        mongoTemplate.updateFirst(query,update,Patient.class);
    }



}
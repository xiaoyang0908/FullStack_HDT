package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;


@RestController
@CrossOrigin
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientImpl patientImpl;


    @GetMapping("/")
    public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
            List<Patient> patients = patientImpl.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            return ResponseEntity.ok(patients);
    }

    @PostMapping("/tasks")
    public  ResponseEntity<List<Tasks>> getAllTasks(@RequestBody Map<String, Object> requestBody) throws Exception{
        LinkedHashMap<String,Object> taskInfo = (LinkedHashMap<String, Object>) requestBody.get("taskinfo");
        String curPatintId = (String) requestBody.get("patientID");
        ObjectMapper objectMapper = new ObjectMapper();
        String taskJson = objectMapper.writeValueAsString(taskInfo);
        Tasks newTask = objectMapper.readValue(taskJson,Tasks.class);
        System.out.println(newTask);

        Patient curPatient = patientImpl.findPatientByPatientId(curPatintId);
        //edit
        if (curPatient.findTask(newTask.get_id())!=null) {
            Tasks oldTask = curPatient.findTask(newTask.get_id());
            oldTask.setSets(newTask.getSets());
            oldTask.setDifficulty(newTask.getDifficulty());
            oldTask.setDate(newTask.getDate());
            oldTask.setTotalTime();
            patientImpl.updateTasks(curPatintId, curPatient.getTasks());
            return ResponseEntity.ok(curPatient.getTasks());
        }else if (newTask!=null && curPatient.findTask(newTask.get_id())==null){
            //insert new task
            String uuid = patientImpl.uniqueId();
            newTask.set_id(curPatintId+ uuid);
            newTask.setTotalTime();
            curPatient.addTasks(newTask);
            patientImpl.insertTasks(curPatintId,newTask);
            return ResponseEntity.ok(curPatient.getTasks());
        }
        return ResponseEntity.status(400).body(null);

    }

//    @PostMapping("/editTask")
//    public ResponseEntity<List<Tasks>> editTask(@RequestBody Map<String, Object> requestBody) throws Exception{
//        LinkedHashMap<String,Object> taskInfo = (LinkedHashMap<String, Object>) requestBody.get("taskinfo");
//        String curPatintId = (String) requestBody.get("patientID");
//        ObjectMapper objectMapper = new ObjectMapper();
//        String taskJson = objectMapper.writeValueAsString(taskInfo);
//        Tasks newTask = objectMapper.readValue(taskJson,Tasks.class);
////        TherapistImpl.changeSymbol = 1;
//        Patient curPatient = patientImpl.findPatientByPatientId(curPatintId);
//        return ResponseEntity.ok(curPatient.getTasks());
//    }

    @PostMapping("/deteteTask")
    public ResponseEntity<List<Tasks>> afterDeleteTasks(@RequestBody Map<String, Object> requestBody) throws Exception{
        String taskId = (String) requestBody.get("taskId");
        String patientID = (String) requestBody.get("patientID");
        Patient curPatient = patientImpl.findPatientByPatientId(patientID);
        curPatient.deleteTask(taskId);
        patientImpl.updateTasks(curPatient.getPatientID(), curPatient.getTasks());
        if (curPatient.getTasks().size()>0){
            return ResponseEntity.ok(curPatient.getTasks());
        }else{
            return ResponseEntity.ok(null);
        }
    }
}
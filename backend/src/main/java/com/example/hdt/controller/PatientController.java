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


    @GetMapping("/allPatient")
    public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
            List<Patient> patients = patientImpl.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            return ResponseEntity.ok(patients);
    }

    @PostMapping("/findPatient")
    public ResponseEntity<Patient> findSpecificPatients(@RequestBody String email) throws Exception{
//        remove ""in json
        String patientEmail = email.replaceAll("\"", "");
        Patient patient = patientImpl.findPatientByEmail(patientEmail);
        if (patient!=null) {
            return ResponseEntity.ok(patient);
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/UpdatePatientPerformance")
    public ResponseEntity<String> UpdatePatientPerformance(@RequestBody Map<String, Object> requestBody) throws Exception{
        LinkedHashMap<String,Object> performanceInfo = (LinkedHashMap<String, Object>) requestBody.get("performance");
        String curPatintId = (String) requestBody.get("patientID");
        ObjectMapper objectMapper = new ObjectMapper();
        String performanceJson = objectMapper.writeValueAsString(performanceInfo);
        Performance newPerformance = objectMapper.readValue(performanceJson,Performance.class);

        Patient curPatient = patientImpl.findPatientByPatientId(curPatintId);
        if(curPatient.getPerformance().isEmpty()){
            curPatient.getPerformance().add(newPerformance);
        }else {
            int flag = 0;
            for (Performance p:
                    curPatient.getPerformance()) {
                if (p.getGameType().equals(newPerformance.getGameType())){
                    flag = 1;
                    p.setStartTime(newPerformance.getStartTime());
                    p.setEndTime(newPerformance.getEndTime());
                    p.setDuration(newPerformance.getDuration());
                    p.setLeft(newPerformance.getLeft());
                    p.setRight(newPerformance.getRight());
                    break;
                }
            }
            if (flag==0){
                curPatient.getPerformance().add(newPerformance);
            }
        }
        patientImpl.updatePerformance(curPatintId,curPatient.getPerformance());
        if (!curPatient.getPerformance().isEmpty()) {
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.status(400).body(null);
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
            if (newTask.getPerformance().isEmpty()) {
                oldTask.setSets(newTask.getSets());
                oldTask.setDifficulty(newTask.getDifficulty());
                oldTask.setDate(newTask.getDate());
            }else {
                oldTask.setPerformance(newTask.getPerformance());
            }
            patientImpl.updateTasks(curPatintId, curPatient.getTasks());
            return ResponseEntity.ok(curPatient.getTasks());
        } else if (newTask!=null && curPatient.findTask(newTask.get_id())==null){
            //insert new task
            String uuid = patientImpl.uniqueId();
            newTask.set_id("Task"+ uuid);
            curPatient.addTasks(newTask);
            patientImpl.insertTasks(curPatintId,newTask);
            return ResponseEntity.ok(curPatient.getTasks());
        }
        return ResponseEntity.status(400).body(null);

    }


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

//        @PostMapping("/editTaskPerformance")
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
}
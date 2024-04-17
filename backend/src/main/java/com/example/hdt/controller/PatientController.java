package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.Game;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Tasks;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


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
        String id = (String) requestBody.get("patientID");
        int count = 0;
        ObjectMapper objectMapper = new ObjectMapper();
        String taskJson = objectMapper.writeValueAsString(taskInfo);
        Tasks newTask = objectMapper.readValue(taskJson,Tasks.class);
        System.out.println(newTask);
        Patient curPatient = patientImpl.findPatientByPatientId(id);
        if (newTask!=null ){
            count++;
            newTask.set_id(id+count);
            curPatient.addTasks(newTask);
            patientImpl.updateTasks(curPatient);
            return ResponseEntity.ok(curPatient.getTasks());
        }
        return ResponseEntity.status(400).body(null);

    }
}
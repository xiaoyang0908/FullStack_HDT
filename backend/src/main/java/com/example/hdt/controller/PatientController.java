package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Tasks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/patient")
public class PatientController {
    @Autowired
    private PatientImpl patientImpl;

    @GetMapping("")
    public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
            List<Patient> patients = patientImpl.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            return ResponseEntity.ok(patients);
    }

    @PostMapping("/patients/tasks")
    public  ResponseEntity<List<Tasks>> getAllTasks(@RequestBody Map<String, Object> requestBody) throws Exception{
        Tasks newTask = (Tasks) requestBody.get("task");
        String id = (String) requestBody.get("patientId");
        Patient curPatient = patientImpl.findPatientById(id);
        if (newTask!=null ){
            curPatient.addTasks(newTask);
            patientImpl.updateTasks(curPatient);
            return ResponseEntity.ok(curPatient.getTasks());
        }
        return ResponseEntity.status(400).body(null);

    }
}
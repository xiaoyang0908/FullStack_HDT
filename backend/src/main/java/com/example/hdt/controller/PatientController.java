package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class PatientController {
    private final PatientImpl patientService;

    @Autowired
    public PatientController(PatientImpl patientService){
        this.patientService = patientService;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients(){
        try {
            List<Patient> patients = patientService.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.noContent().build(); 
            }
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            System.out.println("Error fetching patients: " + e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
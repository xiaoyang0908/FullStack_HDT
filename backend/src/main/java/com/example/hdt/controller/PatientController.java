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
    @Autowired
    private PatientImpl patientImpl;

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getAllPatients() throws Exception{
            List<Patient> patients = patientImpl.getPatientList();
            if (patients.isEmpty()) {
                return ResponseEntity.status(400).body(null);
            }
            return ResponseEntity.ok(patients);
    }
}
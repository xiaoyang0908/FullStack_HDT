package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.TherapistImpl;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/therapist")
public class TherapistController {
    @Autowired
    private TherapistImpl therapistImpl;

    @PostMapping("/activePatients")
    public ResponseEntity<List<Patient>> getAllActivePatients(@RequestBody Map<String, Object> requestBody){
        String therapistId = (String) requestBody.get("id");
        List<Patient> activePatients = therapistImpl.findAllAcitvePatient(therapistId);
        if (activePatients.isEmpty()){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.ok(activePatients);
    }


}

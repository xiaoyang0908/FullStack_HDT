package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.TherapistImpl;
import com.example.hdt.models.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/therapist")
public class TherapistController {
    @Autowired
    private TherapistImpl therapistImpl;

    @PostMapping("/activePatients")
    public ResponseEntity<List<Patient>> getAllActivePatients(@RequestBody Map<String, Object> requestBody) throws Exception{
        String email = (String) requestBody.get("email");
        List<Patient> activePatients = therapistImpl.findAllAcitvePatient(email);
        if (activePatients.isEmpty()){
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.ok(activePatients);
    }


}

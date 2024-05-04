package com.example.hdt.controller;


import com.example.hdt.ServiceImpl.CareImpl;
import com.example.hdt.models.Caregiver;
import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/caregiver")
public class CareController {
    @Autowired
    private CareImpl careImpl;

    @PostMapping("/carePatient")
    public ResponseEntity<Patient> getCarePatient(@RequestBody Map<String, Object> requestBody) throws Exception{
        String caregiverEmail = (String) requestBody.get("caregiverEmail");
        Patient p = careImpl.findCarePatient(caregiverEmail);
        if (p!=null){
            return ResponseEntity.ok(p);
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("")
    public ResponseEntity<Therapist> getCareTherapist(@RequestBody Map<String, Object> requestBody) throws Exception{
        String caregiverEmail = (String) requestBody.get("caregiverEmail");
        Therapist therapist = careImpl.findCareTherapist(caregiverEmail);
        if (therapist!=null){
            return ResponseEntity.ok(therapist);
        }
        return ResponseEntity.status(400).body(null);
    }

}

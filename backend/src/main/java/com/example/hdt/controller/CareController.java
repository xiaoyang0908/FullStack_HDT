package com.example.hdt.controller;


import com.example.hdt.ServiceImpl.CareImpl;
import com.example.hdt.ServiceImpl.TherapistImpl;
import com.example.hdt.models.*;
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


    @PostMapping("/info")
    public ResponseEntity<Combo> getCareTherapist(@RequestBody Map<String, Object> requestBody) throws Exception{
        String caregiverEmail = (String) requestBody.get("caregiverEmail");
        Combo combo = careImpl.findCare(caregiverEmail);
        if (combo!=null){
            return ResponseEntity.ok(combo);
        }
        return ResponseEntity.status(400).body(null);
    }

    @GetMapping("/thumbs")
    public ResponseEntity<Integer> getThumbs() throws Exception{
        int count = careImpl.getcarePatientThumbs();
        if (count>0) {
            return ResponseEntity.ok(count);
        }
        return ResponseEntity.status(400).body(null);
    }
}

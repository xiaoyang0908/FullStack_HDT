package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.TherapistImpl;
import com.example.hdt.models.Patient;
import com.example.hdt.models.RedisDao;
import com.example.hdt.models.Therapist;
import com.example.hdt.models.Thumbs;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/therapist")
public class TherapistController {
    @Autowired
    private TherapistImpl therapistImpl;
    private static final String REDIS_KEY = "CurrentTherapist:%s";

    @PostMapping("/activePatients")
    public ResponseEntity<List<Patient>> getAllActivePatients(@RequestBody Map<String, Object> requestBody) throws Exception{
        String email = (String) requestBody.get("email");
        List<Patient> activePatients = therapistImpl.findAllAcitvePatient(email);
        if (activePatients.isEmpty()){
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(activePatients);
    }


    @PostMapping("/savePatient")
    public ResponseEntity<String> savePatientProfile(@RequestBody Map<String, Object> requestBody)throws Exception{
        LinkedHashMap<String,Object> patientProfile = (LinkedHashMap<String, Object>) requestBody.get("patientProfile");
        String therapistEmail = (String) requestBody.get("therapistEmail");
        ObjectMapper objectMapper = new ObjectMapper();
        String patientJson = objectMapper.writeValueAsString(patientProfile);
        Patient newPatient = objectMapper.readValue(patientJson,Patient.class);
        if (newPatient!=null){
            therapistImpl.addPatientsList(newPatient, therapistEmail);
            return  ResponseEntity.ok("success");
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/Thumbs")
    public ResponseEntity<Integer> getThumbs(@RequestBody Map<String, Object> requestBody) throws Exception{
        String thumbsId = (String) requestBody.get("thumbsID");
        String therapistEmail = (String) requestBody.get("therapistEmail");
        String redisKey = String.format(REDIS_KEY,therapistEmail);
        int count=0;
        Therapist curTherapist = (Therapist) TherapistImpl.cacheTherapist.get(redisKey);
        for (Thumbs t:  curTherapist.getThumbs()){
            if (t.getId().equals(thumbsId)){
                count = t.getThumbsCount();
                count++;
                t.setThumbsCount(count);
                therapistImpl.updateThumbsUp(thumbsId,count,therapistEmail);
                break;
            }
        }
        return ResponseEntity.ok(count);

    }

}

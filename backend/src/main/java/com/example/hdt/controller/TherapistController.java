package com.example.hdt.controller;

import com.example.hdt.models.Therapist;
import com.example.hdt.repositories.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TherapistController {
    private final TherapistRepository therapistRepository;

    @Autowired
    public TherapistController(TherapistRepository therapistRepository){
        this.therapistRepository = therapistRepository;
    }
    @RequestMapping("/therapist")
    public List<Therapist> getTherapist(){
        return therapistRepository.findAll();
    }
}

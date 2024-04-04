package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Patient;
import com.example.hdt.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PatientImpl{
    @Autowired
    private  PatientRepository patientRepo;

    public Patient getPatient(String id){
        return patientRepo.findById(id).get();
    }

    public List<Patient> getPatientList(){
        return patientRepo.findAll();
    }
}
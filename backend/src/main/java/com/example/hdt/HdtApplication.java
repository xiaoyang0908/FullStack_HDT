package com.example.hdt;

import com.example.hdt.models.Patient;
import com.example.hdt.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HdtApplication implements CommandLineRunner {
    private final PatientRepository patientRepository;

    @Autowired
    public HdtApplication(PatientRepository patientRepository){
        this.patientRepository = patientRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(HdtApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}

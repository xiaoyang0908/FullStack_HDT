package com.example.hdt.repositories;

import com.example.hdt.models.Patient;
import com.example.hdt.models.Therapist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TherapistRepository extends MongoRepository<Therapist,String> {

}

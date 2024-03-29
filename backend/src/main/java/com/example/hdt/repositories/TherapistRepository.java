package com.example.hdt.repositories;

import com.example.hdt.models.Therapist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TherapistRepository extends MongoRepository<Therapist,String> {

}

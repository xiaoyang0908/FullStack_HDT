package com.example.hdt.repositories;

import com.example.hdt.models.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    /*
    * operate database
    * myBatis
    * get info by id
    * @param id
    * find() findOne()
    * */


}

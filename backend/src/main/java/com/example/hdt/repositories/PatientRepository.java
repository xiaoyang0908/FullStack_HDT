package com.example.hdt.repositories;

import com.example.hdt.models.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    /*
    * myBatis
    * get info by id
    * @param id
    * find() findOne()
    * */
    Patient getPatient(String id);

    List<Patient> getPatientList(String name);

    /*
    * insert data --- save()
    * @param patient
    * */
    void insertPatient(Patient patient);

    /*
    * delete data
    * @param id
    * */
    void deletePatient(String id);

    /*
    * update data
    * @param id
    * */
    void updataPatient(String id);

}

package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.ArrayList;
@Document("therapistProfile")
public class Therapist implements Serializable {
        @Id
        private String id;

        @Field("Name")
        private String name;

        @Field("Email")
        private String email;

        @Field("Password")
        private String password;

        @Field("Phone")
        private String phone;

        @Field("Picture")
        private String picture;

        @Field("ActivePatients")
        private ArrayList<String> activePatients;

        @Field("ArchivedPatients")
        private ArrayList<String> archivedPatients;

        @Field("TherapistID")
        private String therapistID;

        @Field("ClinicID")
        private String clinicID;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public ArrayList<String> getActivePatients() {
        return activePatients;
    }

    public void addActivePatients(String patientId) {
        this.activePatients.add(patientId);
    }

    public ArrayList<String> getArchivedPatients() {
        return archivedPatients;
    }

    public void addArchivedPatients(String patientId) {
        this.archivedPatients.add(patientId);
    }

    public String getTherapistID() {
        return therapistID;
    }

    public void setTherapistID(String therapistID) {
        this.therapistID = therapistID;
    }

    public String getClinicID() {
        return clinicID;
    }

    public void setClinicID(String clinicID) {
        this.clinicID = clinicID;
    }

    // Getters and setters






}

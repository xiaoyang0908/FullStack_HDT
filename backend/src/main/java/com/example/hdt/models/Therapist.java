package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
@Document
public class Therapist {
    @Id
    private String id;
    @Field
    private String clinicId;
    @Field
    private String name;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private ArrayList<String> activePatients;
    @Field
    private ArrayList<String> archivedPatients;

    public Therapist(String id, String clinicId, String name, String email, String password, ArrayList<String> activePatients, ArrayList<String> archivedPatients) {
        this.id = id;
        this.clinicId = clinicId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.activePatients = activePatients;
        this.archivedPatients = archivedPatients;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClinicId() {
        return clinicId;
    }

    public void setClinicId(String clinicId) {
        this.clinicId = clinicId;
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

    public ArrayList<String> getActivePatients() {
        return activePatients;
    }

    public void setActivePatients(ArrayList<String> activePatients) {
        this.activePatients = activePatients;
    }

    public ArrayList<String> getArchivedPatients() {
        return archivedPatients;
    }

    public void setArchivedPatients(ArrayList<String> archivedPatients) {
        this.archivedPatients = archivedPatients;
    }

    @Override
    public String toString() {
        return "Therapist{" +
                "id='" + id + '\'' +
                ", clinicId='" + clinicId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", activePatients=" + activePatients +
                ", archivedPatients=" + archivedPatients +
                '}';
    }
}

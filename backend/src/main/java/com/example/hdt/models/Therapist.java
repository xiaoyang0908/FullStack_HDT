package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
@Document("therapistProfile")
public class Therapist {
    @Id
    private String id;
    @Field
    private String ClinicId;
    @Field
    private String Name;
    @Field
    private String Email;
    @Field
    private String Password;
    @Field
    private String Phone;
    @Field
    private String Picture;
    @Field
    private ArrayList<String> ActivePatients;
    @Field
    private ArrayList<String> ArchivedPatients;


    public Therapist(String id, String clinicId, String name, String email, String password, String phone, String picture, ArrayList<String> activePatients, ArrayList<String> archivedPatients) {
        this.id = id;
        ClinicId = clinicId;
        Name = name;
        Email = email;
        Password = password;
        Phone = phone;
        Picture = picture;
        ActivePatients = activePatients;
        ArchivedPatients = archivedPatients;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClinicId() {
        return ClinicId;
    }

    public void setClinicId(String clinicId) {
        ClinicId = clinicId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getPicture() {
        return Picture;
    }

    public void setPicture(String picture) {
        Picture = picture;
    }

    public ArrayList<String> getActivePatients() {
        return ActivePatients;
    }

    public void setActivePatients(ArrayList<String> activePatients) {
        ActivePatients = activePatients;
    }

    public ArrayList<String> getArchivedPatients() {
        return ArchivedPatients;
    }

    public void setArchivedPatients(ArrayList<String> archivedPatients) {
        ArchivedPatients = archivedPatients;
    }
}

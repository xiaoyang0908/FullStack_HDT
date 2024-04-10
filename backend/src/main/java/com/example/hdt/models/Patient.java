package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document("patientProfile")
public class Patient {
    @Id
    private String PatientID;
    @Field
    private String Name;
    @Field
    private String Email;
    @Field
    private String Phone;
    @Field
    private String Password;
    @Field
    private String Biometrics;
    @Field
    private String LoginMode;
    @Field
    private String ActivityStatus;
    @Field
    private String Photo;
    @Field
    private ArrayList<String> Caregivers;
    @Field
    private ArrayList<String> Therapists;

    public String getPatientID() {
        return PatientID;
    }

    public void setPatientID(String patientID) {
        PatientID = patientID;
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

    public String getBiometrics() {
        return Biometrics;
    }

    public void setBiometrics(String biometrics) {
        Biometrics = biometrics;
    }

    public String getLoginMode() {
        return LoginMode;
    }

    public void setLoginMode(String loginMode) {
        LoginMode = loginMode;
    }

    public String getActivityStatus() {
        return ActivityStatus;
    }

    public void setActivityStatus(String activityStatus) {
        ActivityStatus = activityStatus;
    }

    public String getPhoto() {
        return Photo;
    }

    public void setPhoto(String photo) {
        Photo = photo;
    }

    public ArrayList<String> getCaregivers() {
        return Caregivers;
    }

    public void setCaregivers(ArrayList<String> caregivers) {
        Caregivers = caregivers;
    }

    public ArrayList<String> getTherapists() {
        return Therapists;
    }

    public void setTherapists(ArrayList<String> therapists) {
        Therapists = therapists;
    }
}


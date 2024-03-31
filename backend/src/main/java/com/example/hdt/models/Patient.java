package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document("patientProfile")
public class Patient {
    @Id
    private String patientID;
    @Field
    private String name;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private String biometrics;
    @Field
    private String loginMode;
    @Field
    private String photo;
    @Field
    private ArrayList<String> caregivers;
    @Field
    private ArrayList<String> therapists;

    public Patient(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLoginMode() {
        return loginMode;
    }

    public void setLoginMode(String loginMode) {
        this.loginMode = loginMode;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public ArrayList<String> getCaregivers() {
        return caregivers;
    }

    public void setCaregivers(ArrayList<String> caregivers) {
        this.caregivers = caregivers;
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

    public String getPatientID() {
        return patientID;
    }

    public void setPatientID(String patientID) {
        this.patientID = patientID;
    }

    public String getBiometrics() {
        return biometrics;
    }

    public void setBiometrics(String biometrics) {
        this.biometrics = biometrics;
    }

    public ArrayList<String> getTherapists() {
        return therapists;
    }

    public void setTherapists(ArrayList<String> therapists) {
        this.therapists = therapists;
    }

    public Patient(String patientID, String name, String email, String password, String biometrics, String loginMode, String photo, ArrayList<String> caregivers, ArrayList<String> therapists) {
        this.patientID = patientID;
        this.name = name;
        this.email = email;
        this.password = password;
        this.biometrics = biometrics;
        this.loginMode = loginMode;
        this.photo = photo;
        this.caregivers = caregivers;
        this.therapists = therapists;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientID='" + patientID + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", biometrics='" + biometrics + '\'' +
                ", loginMode='" + loginMode + '\'' +
                ", photo='" + photo + '\'' +
                ", caregivers=" + caregivers +
                ", therapists=" + therapists +
                '}';
    }
}

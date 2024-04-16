package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.scheduling.config.Task;

import java.util.ArrayList;
import java.util.List;

@Document("patientProfile")
public class Patient {
    @Id
    private String PatientID;
    @Field
    private String Birth;
    @Field
    private String Name;
    @Field
    private String Email;
    @Field
    private String Phone;
    @Field
    private String Photo;
    @Field
    private ArrayList<String> Caregivers;

    @DBRef
    private ArrayList<String> Therapists;
    @Field
    private String Impaired;
    @Field
    private String DominantArm;
    @Field
    private String Goals;
    @Field
    private String ActivityStatus;
    @DBRef
    private ArrayList<Tasks> tasks;

    public Patient() {
    }

    public Patient(String patientID, String birth, String name, String email, String phone, String photo, ArrayList<String> caregivers, ArrayList<String> therapists, String impaired, String dominantArm, String goals, String activityStatus, ArrayList<Tasks> tasks) {
        PatientID = patientID;
        Birth = birth;
        Name = name;
        Email = email;
        Phone = phone;
        Photo = photo;
        Caregivers = caregivers;
        Therapists = therapists;
        Impaired = impaired;
        DominantArm = dominantArm;
        Goals = goals;
        ActivityStatus = activityStatus;
        this.tasks = tasks;
    }

    public ArrayList<Tasks> getTasks() {
        return tasks;
    }

    public void addTasks(Tasks task) {
        tasks.add(task);
    }

    public String getPatientID() {
        return PatientID;
    }

    public void setPatientID(String patientID) {
        PatientID = patientID;
    }

    public String getBirth() {
        return Birth;
    }

    public void setBirth(String birth) {
        Birth = birth;
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

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
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

    public void addTherapists(String therapistId) {
        Therapists.add(therapistId);
    }

    public String getImpaired() {
        return Impaired;
    }

    public void setImpaired(String impaired) {
        Impaired = impaired;
    }

    public String getDominantArm() {
        return DominantArm;
    }

    public void setDominantArm(String dominantArm) {
        DominantArm = dominantArm;
    }

    public String getGoals() {
        return Goals;
    }

    public void setGoals(String goals) {
        Goals = goals;
    }

    public String getActivityStatus() {
        return ActivityStatus;
    }

    public void setActivityStatus(String activityStatus) {
        ActivityStatus = activityStatus;
    }
}
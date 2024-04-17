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
    private String id;

    @Field("PatientID")
    private String patientID;

    @Field("Birth")
    private String birth;

    @Field("Name")
    private String name;

    @Field("Email")
    private String email;

    @Field("Phone")
    private String phone;

    @Field("Photo")
    private String photo;

    @Field("Caregivers")
    private ArrayList<String> caregivers;

    @Field("Therapists")
    private ArrayList<String> therapists;

    @Field("Impaired")
    private String impaired;

    @Field("DominantArm")
    private String dominantArm;

    @Field("Goals")
    private String goals;

    @Field("ActivityStatus")
    private String activityStatus;

    @Field("Tasks")
    private ArrayList<Tasks> tasks;



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientID() {
        return patientID;
    }

    public void setPatientID(String patientID) {
        this.patientID = patientID;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
    public String getImpaired() {
        return impaired;
    }

    public void setImpaired(String impaired) {
        this.impaired = impaired;
    }

    public String getDominantArm() {
        return dominantArm;
    }

    public void setDominantArm(String dominantArm) {
        this.dominantArm = dominantArm;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }

    public String getActivityStatus() {
        return activityStatus;
    }

    public void setActivityStatus(String activityStatus) {
        this.activityStatus = activityStatus;
    }

    public void setCaregivers(ArrayList<String> caregivers) {
        this.caregivers = caregivers;
    }

    public void setTherapists(ArrayList<String> therapists) {
        this.therapists = therapists;
    }

    public ArrayList<Tasks> getTasks() {
        return tasks;
    }

    public void addTasks(Tasks task) {
        this.tasks = new ArrayList<>();
        this.tasks.add(task);
    }
}
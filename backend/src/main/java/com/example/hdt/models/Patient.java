package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.scheduling.config.Task;

import java.io.Serializable;
import java.util.*;

@Document("patientProfile")
public class Patient implements Serializable {
    @Id
    private String id;

    @Field("PatientID")
    private String patientID;

    @Field("Password")
    private String password;

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
    private String caregivers;

    @Field("Therapists")
    private String therapists;

    @Field("Impaired")
    private String impaired;

    @Field("DominantArm")
    private String dominantArm;

    @Field("Goals")
    private String goals;

    @Field("ActivityStatus")
    private String activityStatus = "Active";

    @Field("Tasks")
    private ArrayList<Tasks> tasks;

    @Field("sexual")
    private String sexual;

    @Field("Avatar")
    private String avatar;

    @Field("Contact")
    private Contact contact = new Contact();

    @Field("thumbs")
    private int thumbs = 0;

    @Field("thumbs_caregivers")
    private int thumbs_caregivers =0;

    @Field("performance")
    private ArrayList<Performance> performance = new ArrayList<>();

    @Field("UnityAvatar")
    private String UnityAvatar = "";

    @Field("TotalExerciseHours")
    private double TotalExerciseHours = 0;

    @Field("WeekExerciseHours")
    private double WeekExerciseHours = 0;





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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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


    public void setTasks(ArrayList<Tasks> tasks) {
        this.tasks = tasks;
    }

    public void setSexual(String sexual) {
        this.sexual = sexual;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
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


    public void addTherapists(String id) {
        this.therapists = id;
    }

    public ArrayList<Tasks> getTasks() {
        if (this.tasks==null){
            return new ArrayList<>();
        }
        return tasks;
    }


    public String getSexual() {
        return sexual;
    }

    public String getAvatar() {
        return avatar;
    }

    public Contact getContact() {
        return contact;
    }

    public Tasks findTask(String taskId){
        Iterator<Tasks> tasksIterator = this.tasks.iterator();
        while (tasksIterator.hasNext()){
            Tasks task = tasksIterator.next();
            if (task.get_id().equals(taskId)){
                return task;
            }
            break;
        }
        return null;
    }

    public void addTasks(Tasks task) {
        if (this.tasks==null){
            this.tasks = new ArrayList<>();
        }
        this.tasks.add(task);
    }
    public void deleteTask(String taskId){
        Iterator<Tasks> tasksIterator = this.tasks.iterator();
        while (tasksIterator.hasNext()){
            Tasks task = tasksIterator.next();
            if (task.get_id().equals(taskId)){
                tasksIterator.remove();
            }
        }
    }

    public int getThumbs() {
        return thumbs;
    }

    public void setThumbs(int thumbs) {
        this.thumbs = thumbs;
    }

    public int getThumbs_caregivers() {
        return thumbs_caregivers;
    }

    public void setThumbs_caregivers(int thumbs_caregivers) {
        this.thumbs_caregivers = thumbs_caregivers;
    }

    public String getCaregivers() {
        return caregivers;
    }

    public void setCaregivers(String caregivers) {
        this.caregivers = caregivers;
    }

    public String getTherapists() {
        return therapists;
    }

    public void setTherapists(String therapists) {
        this.therapists = therapists;
    }

    public String getUnityAvatar() {
        return UnityAvatar;
    }

    public void setUnityAvatar(String unityAvatar) {
        UnityAvatar = unityAvatar;
    }

    public double getTotalExerciseHours() {
        return TotalExerciseHours;
    }

    public void setTotalExerciseHours(double totalExerciseHours) {
        TotalExerciseHours = totalExerciseHours;
    }

    public double getWeekExerciseHours() {
        return WeekExerciseHours;
    }

    public void setWeekExerciseHours(double weekExerciseHours) {
        WeekExerciseHours = weekExerciseHours;
    }

    public ArrayList<Performance> getPerformance() {
        return performance;
    }

    public void setPerformance(ArrayList<Performance> performance) {
        this.performance = performance;
    }
}
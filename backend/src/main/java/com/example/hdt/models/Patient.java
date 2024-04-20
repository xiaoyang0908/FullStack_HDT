package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.scheduling.config.Task;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Document("patientProfile")
public class Patient {
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

    @Field("sexual")
    private String sexual;

    @Field("Avatar")
    private String avatar;

    @Field("Contact")
    private Object contact;





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

    public void setTherapists(ArrayList<String> therapists) {
        this.therapists = therapists;
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

    public void setContact(Object contact) {
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

    public void setCaregivers(ArrayList<String> caregivers) {
        this.caregivers = caregivers;
    }

    public void addTherapists(String id) {
        this.therapists.add(id);
    }

    public ArrayList<Tasks> getTasks() {
        if (this.tasks==null){
            return new ArrayList<>();
        }
        return tasks;
    }

    public ArrayList<String> getCaregivers() {
        return caregivers;
    }

    public ArrayList<String> getTherapists() {
        return therapists;
    }

    public String getSexual() {
        return sexual;
    }

    public String getAvatar() {
        return avatar;
    }

    public Object getContact() {
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
}
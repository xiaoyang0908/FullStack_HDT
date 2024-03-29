package com.example.hdt.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;

@Document
public class Patient {
    @Id
    private String id;
    @Field
    private String name;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private String loginMode;
    @Field
    private String photo;
    @Field
    private ArrayList<String> caregivers;

    public Patient(){}

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


    public Patient(String id, String name, String email, String password, String loginMode, String photo, ArrayList<String> caregivers) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.loginMode = loginMode;
        this.photo = photo;
        this.caregivers = caregivers;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", loginMode='" + loginMode + '\'' +
                ", photo='" + photo + '\'' +
                ", caregivers=" + caregivers +
                '}';
    }
}

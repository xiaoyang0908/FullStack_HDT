package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Document("caregiverProfile")
public class Caregiver implements Serializable {
    @Id
    private String _id;

    @Field("CaregiverID")
    private String caregiverID;
    @Field("PatientID")
    private String patientID;
    @Field("Name")
    private String name;
    @Field("Photo")
    private String photo;
    @Field("Email")
    private String email;
    @Field("Password")
    private String password;
    @Field("Phone")
    private String phone;
    @Field("LiveLink")
    private String liveLink;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCaregiverID() {
        return caregiverID;
    }

    public void setCaregiverID(String caregiverID) {
        this.caregiverID = caregiverID;
    }

    public String getPatientID() {
        return patientID;
    }

    public void setPatientID(String patientID) {
        this.patientID = patientID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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

    public String getLiveLink() {
        return liveLink;
    }

    public void setLiveLink(String liveLink) {
        this.liveLink = liveLink;
    }
}

package com.example.hdt.models;

import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

public class Contact implements Serializable {

    @Field("fullName")
    private String fullName;
    @Field("email")
    private String email;
    @Field("phoneNumber")
    private String phoneNumber;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("signUpUsers")
public class User {

    @Id
    private String _id;
    @Field
    private String email;
    @Field
    private String password;
    @Field
    private String name;
    @Field
    private String status;
    @Field
    private String role;

    public User(String email, String password, String name, String status, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.status = status;
        this.role = role;
    }
    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}

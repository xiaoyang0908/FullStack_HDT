package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

@Document("gameCategory")
public class Game implements Serializable {
    @Id
    private String _id;
    @Field("type")
    private String type;
    @Field("equippment")
    private String equippment;
    @Field("slots")
    private int slots;
    @Field("img")
    private String img;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEquippment() {
        return equippment;
    }

    public void setEquippment(String equippment) {
        this.equippment = equippment;
    }

    public int getSlots() {
        return slots;
    }

    public void setSlots(int slots) {
        this.slots = slots;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}

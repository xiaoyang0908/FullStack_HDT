package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("gameCategory")
public class Game {
    @Id
    private String _id;
    @Field
    private String type;
    @Field
    private String equippment;
    @Field
    private String slots;
    @Field
    private String img;

    public Game(String _id, String type, String equippment, String slots, String img) {
        this._id = _id;
        this.type = type;
        this.equippment = equippment;
        this.slots = slots;
        this.img = img;
    }

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

    public String getSlots() {
        return slots;
    }

    public void setSlots(String slots) {
        this.slots = slots;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}

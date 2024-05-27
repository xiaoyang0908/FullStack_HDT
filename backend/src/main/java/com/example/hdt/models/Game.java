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
    @Field("icon")
    private String icon;
    @Field("video")
    private String video;

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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }
}

package com.example.hdt.models;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;

public class Thumbs implements Serializable {
    @Field("id")
    private String id;
    @Field("thumbsCount")
    private int thumbsCount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getThumbsCount() {
        return thumbsCount;
    }

    public void setThumbsCount(int thumbsCount) {
        this.thumbsCount = thumbsCount;
    }

    @Override
    public String toString() {
        return "Thumbs{" +
                "id='" + id + '\'' +
                ", thumbsCount=" + thumbsCount +
                '}';
    }
}

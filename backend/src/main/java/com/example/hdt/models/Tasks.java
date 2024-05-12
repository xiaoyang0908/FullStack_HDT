package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.util.ArrayList;

@Document("tasks")
public class Tasks implements Serializable {
        @Id
        private String _id;
        @Field
        private Game game;
        @Field
        private String difficulty;
        @Field
        private int sets;
        @Field
        private String status = "Awaiting Start";
        @Field
        private String date;
        @Field
        private int spentTime = 0;
        @Field
        private int finisheSets = 0;
        @Field
        private ArrayList<Performance> performance = new ArrayList<>();



    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getSpentTime() {
        return spentTime;
    }

    public void setSpentTime(int spentTime) {
        this.spentTime = spentTime;
    }

    public int getFinisheSets() {
        return finisheSets;
    }

    public void setFinisheSets(int finisheSets) {
        this.finisheSets = finisheSets;
    }

    public ArrayList<Performance> getPerformance() {
        return performance;
    }

    public void setPerformance(ArrayList<Performance> performance) {
        this.performance = performance;
    }
}

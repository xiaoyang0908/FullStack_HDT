package com.example.hdt.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("tasks")
public class Tasks {
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

    public Tasks(String _id, Game game, String difficulty, int sets, String status, String date) {
        this._id = _id;
        this.game = game;
        this.difficulty = difficulty;
        this.sets = sets;
        this.status = status;
        this.date = date;
    }

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
}

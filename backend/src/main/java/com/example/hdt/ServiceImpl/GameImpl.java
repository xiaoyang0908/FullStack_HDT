package com.example.hdt.ServiceImpl;

import com.example.hdt.models.Game;
import com.example.hdt.models.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;

public class GameImpl {

    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    public List<Game> getAllGames(){
        return mongoTemplate.findAll(Game.class);
    }
}

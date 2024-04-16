package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.GameImpl;
import com.example.hdt.models.Game;
import com.example.hdt.models.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public class GameController {

    @Autowired
    private GameImpl gameImpl;

    @RequestMapping("/game")
    public ResponseEntity<List<Game>> getGameList(){
        List<Game> games = gameImpl.getAllGames();
        if (games.isEmpty()) {
            return ResponseEntity.status(400).body(null);
        }
        return ResponseEntity.ok(games);
    }

}

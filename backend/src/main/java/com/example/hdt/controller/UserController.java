package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.UserImpl;
import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/login")
public class UserController {
    @Autowired
    private UserImpl userImpl;

//    @PostMapping("/user")
    public ResponseEntity<User> authenticateUser(@RequestParam("username")String email, @RequestParam("password")String password){
//        get all users
        List<User> userList = userImpl.getUserList();
        for (User user1:userList) {
            if (user1.getEmail()==email && user1.getPassword()== password){
                user1.setStatus("online");
                userImpl.updateUser(user1);
                return new ResponseEntity<User>(user1, HttpStatusCode.valueOf(1));
            }
        }
        return new ResponseEntity<User>(HttpStatusCode.valueOf(0));
    }

    @GetMapping("/{id}")
    public User getUserById(String id){
        return userImpl.getUser(id);
    }

}

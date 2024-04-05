package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.UserImpl;
import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin
//@RequestMapping("/login")
public class UserController {
    @Autowired
    private UserImpl userImpl;

    @PostMapping("/login")
//    requesParam could not get the corresponding param name, so use requestBody to get the jsonObject
    public ResponseEntity<User> authenticateUser(@RequestBody Map<String, Object> requestBody) throws Exception{
//        get all users
        String username = (String) requestBody.get("username");
        String password = (String) requestBody.get("password");
        System.out.println(username+password);
        List<User> userList = userImpl.getUserList();
        for (User user1:userList) {
            if (user1.getEmail().equals(username) && user1.getPassword().equals(password)){
                user1.setStatus("online");
                userImpl.updateUser(user1);
                return ResponseEntity.ok(user1);
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/{id}")
    public User getUserById(String id){
        return userImpl.getUser(id);
    }

}

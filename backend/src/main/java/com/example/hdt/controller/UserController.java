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
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserImpl userImpl;
    User u = new User();

    @PostMapping("/auth")
//    requesParam could not get the corresponding param name, so use requestBody to get the jsonObject
    public ResponseEntity<User> authenticateUser(@RequestBody Map<String, Object> requestBody) throws Exception{
//        get all users
        int flag = 0;
        String username = (String) requestBody.get("username");
        String password = (String) requestBody.get("password");
        System.out.println(username+password);
        User cueUser = userImpl.findUserByEmail(username);
        if (cueUser.getPassword().equals(password)){
            u.setEmail(username);
            System.out.println(cueUser.getStatus());
            if (cueUser.getStatus().equals("offline")) {
                cueUser.setStatus("online");
            }
            userImpl.updateStatus(cueUser);
            return ResponseEntity.ok(cueUser);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/logout")
    public ResponseEntity<User> authenticateLogout() throws Exception{
//        get all users
        String username = u.getEmail();
        System.out.println(username);
        User cueUser = userImpl.findUserByEmail(username);
        if (cueUser!=null) {
            if (cueUser.getStatus().equals("online")) {
                cueUser.setStatus("offline");
                userImpl.updateStatus(cueUser);
            }
            return ResponseEntity.ok(cueUser);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

}

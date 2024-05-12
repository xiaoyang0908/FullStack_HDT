package com.example.hdt.controller;

import com.example.hdt.ServiceImpl.CareImpl;
import com.example.hdt.ServiceImpl.TherapistImpl;
import com.example.hdt.ServiceImpl.UserImpl;
import com.example.hdt.models.RedisDao;
import com.example.hdt.models.Therapist;
import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.TimeUnit;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserImpl userImpl;
    private static final String REDIS_KEY = "LoginInUser:%s";
    private static final String REDIS_KEY1 = "CurrentTherapist:%s";
    private static RedisDao<User> cacheUser;
//    private static User u=new User();

    @Autowired
    public UserController(RedisDao<User> cacheUser) {
        this.cacheUser = cacheUser;
    }

    @PostMapping("/auth")
//    requesParam could not get the corresponding param name, so use requestBody to get the jsonObject
    public ResponseEntity<User> authenticateUser(@RequestBody Map<String, Object> requestBody) throws Exception{
//        get all users
        String username = (String) requestBody.get("username");
        String password = (String) requestBody.get("password");
        System.out.println(username+password);
        String redisKey = String.format(REDIS_KEY,username);
        User cueUser = userImpl.findUserByEmail(username);

        if (cueUser != null) {
            if (cueUser.getPassword().equals(password)){
                if (cueUser.getStatus().equals("offline") && !cacheUser.hasKey(redisKey)) {
                    cueUser.setStatus("online");
                    //set Unique rediskey based on email
                    cacheUser.setRedis(redisKey,cueUser);
                    userImpl.updateStatus(cueUser);
                }
                return ResponseEntity.ok(cueUser);
            }
        } else {
            System.out.println("User not found");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> authenticateLogout(@RequestBody Map<String, Object> requestBody) throws Exception{
//        get login in user in cache
        String username = (String) requestBody.get("username");;
        String redisKey = String.format(REDIS_KEY,username);
        User cueUser = userImpl.findUserByEmail(username);

        if (cueUser!=null) {
            if (cueUser.getStatus().equals("online")) {
                cueUser.setStatus("offline");
                userImpl.updateStatus(cueUser);
            }
            if (cacheUser.hasKey(redisKey)) {
                //delete in cache
                cacheUser.del(redisKey);
            }
            if (cueUser.getRole().equals("Therapist") && TherapistImpl.cacheTherapist.hasKey(String.format(REDIS_KEY1, username))) {
                TherapistImpl.cacheTherapist.del(String.format(REDIS_KEY1, username));
            }
            if (cueUser.getRole().equals("Caregiver") && CareImpl.cacheCaregiver.hasKey("CurrentCaregiver")) {
                CareImpl.cacheCaregiver.del("CurrentCaregiver");
            }
            return ResponseEntity.ok(cueUser.getStatus());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

}

/*
 * @GetMapping("/users") // Test API to get all users
 * public ResponseEntity<List<User>> getAllUsers() {
 * List<User> users = userImpl.getUserList();
 * return ResponseEntity.ok(users);
 * }
 */
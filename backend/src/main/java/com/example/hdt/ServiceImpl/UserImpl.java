package com.example.hdt.ServiceImpl;

import com.example.hdt.models.User;
import com.example.hdt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpl {
    @Autowired
    private UserRepository userRepository;

//    get user
    public User getUser(String id){
        return userRepository.findById(id).get();
    }

    public List<User> getUserList(){
        return userRepository.findAll();
    }
//    update
    public void updateUser(User user){
        userRepository.save(user);
    }
}

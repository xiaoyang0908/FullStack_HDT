package com.example.hdt;

import com.example.hdt.models.User;
import com.example.hdt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HdtApplication implements CommandLineRunner {
    private final UserRepository userRepository;

    @Autowired
    public HdtApplication(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(HdtApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findAll().isEmpty()){
            userRepository.save(new User("1","kkk","kkk@gamil.com","123"));
            userRepository.save(new User("2","qqq","qqq@gamil.com","456"));

        }
        for (User user: userRepository.findAll()){
            System.out.println(user);
        }
    }
}

package com.example.hdt;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;

@SpringBootTest
class HdtApplicationTests {
    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testRedis() {
        redisTemplate.opsForValue().set("1","yang");
        System.out.println(redisTemplate.opsForValue().get("1"));

    }

}

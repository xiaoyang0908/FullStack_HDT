package com.example.hdt.ServiceImpl;

import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

public class RedisImpl<T> {

    @Autowired
    private RedisTemplate<String,T> redisTemplate;
    private static final String REDIS_KEY = "user:%d";

    public void setRedis(String key, T t){
        String redisKey = String.format(REDIS_KEY,key);
        ValueOperations<String,T> operations = redisTemplate.opsForValue();

        if (redisTemplate.hasKey(redisKey)){
            operations.set(redisKey,t);
            System.out.println("add to redis successfully");
        }else{
            System.out.println(operations.get(redisKey));
        }
    }
}

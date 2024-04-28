package com.example.hdt.models;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;


import java.util.List;

@Component
public class RedisDao<T> {

    @Autowired(required = false)
    private RedisTemplate redisTemplate;


    public void setRedis(String key, T t){
        ValueOperations operations = redisTemplate.opsForValue();

        if (redisTemplate.hasKey(key)){
            System.out.println(operations.get(key));
        }else{
            operations.set(key,t);
            System.out.println("add to redis successfully");
        }
    }

    public void setRedisList(String key, List<T> tlist){
        ListOperations listOps = redisTemplate.opsForList();
        for (T t:tlist) {
            listOps.leftPush(key,t);
        }
    }

    public Object get(String key){
        return redisTemplate.opsForValue().get(key);
    }

    public void del(String key){
        redisTemplate.delete(key);
    }
}

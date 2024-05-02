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


    public boolean hasKey(String key){
        return redisTemplate.hasKey(key);
    }

    public void setRedisList(List<String> keys, List<T> tlist){
        ListOperations listOps = redisTemplate.opsForList();
        for (int i = 0; i < tlist.size(); i++) {
            listOps.leftPush(keys.get(i),tlist.get(i));
        }
    }

    public Object get(String key){
        return redisTemplate.opsForValue().get(key);
    }

    public void del(String key){
        redisTemplate.delete(key);
    }
}

package com.example.hdt.ServiceImpl;

import com.example.hdt.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserImpl {
    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

//    get user
    public User findUserByEmail(String email){
        Query query = new Query(Criteria.where("email").is(email));
        return mongoTemplate.findOne(query,User.class);
    }

    public List<User> getUserList(){
        return mongoTemplate.findAll(User.class);
    }
//    update
    public void updateStatus(User user){
        Query query = new Query(Criteria.where("_id").is(user.get_id()));
        Update update = new Update().set("status",user.getStatus());
        mongoTemplate.updateFirst(query,update,User.class);

    }
}

//package com.example.Ecom_proj.service;
//
//import com.example.Ecom_proj.model.Users;
//import com.example.Ecom_proj.repo.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepo repo;
//
////    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
//
//
//    public Users register(Users user) {
////        user.setPassword(encoder.encode(user.getPassword()));
//        return repo.save(user);
//    }
//
//    public Users login(Users user) {
//        return repo.findByUsername(user.getUsername());
//    }
//}

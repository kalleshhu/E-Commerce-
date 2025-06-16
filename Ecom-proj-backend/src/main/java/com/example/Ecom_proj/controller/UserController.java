//package com.example.Ecom_proj.controller;
//
//
//import com.example.Ecom_proj.model.Users;
//import com.example.Ecom_proj.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class UserController {
//
//    @Autowired
//    private UserService service;
//
//    @PostMapping("/")
//    public Users login(@RequestBody Users user) {
//        return service.login(user);
//    }
//
//    @PostMapping("/register")
//    public Users register(@RequestBody Users user) {
//        return service.register(user);
//    }
//
////    @PostMapping("/login")
////    public String login(@RequestBody Users loginUser) {
////        Users user = userRepo.findByUsername(loginUser.getUsername());
////
////        if (user == null || !user.getPassword().equals(loginUser.getPassword())) {
////            return "Invalid username or password";
////        }
////        return "Login successful";
////    }
////
////    @PostMapping("/register")
////    public String register(@RequestBody Users newUser) {
////        if (userRepo.findByUsername(newUser.getUsername()) != null) {
////            return "Username already exists";
////        }
////        userRepo.save(newUser);
////        return "User registered successfully";
////    }
////}
//
//}

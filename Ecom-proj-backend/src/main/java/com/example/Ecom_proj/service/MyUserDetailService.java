//package com.example.Ecom_proj.service;
//
//import com.example.Ecom_proj.model.UserPrincipal;
//import com.example.Ecom_proj.model.Users;
//import com.example.Ecom_proj.repo.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class MyUserDetailService implements UserDetailsService {
//
//    @Autowired
//    private UserRepo repo;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Users user = repo.findByUsername(username);
//
//        if (user == null) {
//            System.out.println("User not found");
//            throw  new UsernameNotFoundException("User not found");
//        }
//        return new UserPrincipal(user);
//    }
//}

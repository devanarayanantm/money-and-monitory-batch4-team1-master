package com.example.moneyandmonitory.user_management_service.controller;

import com.example.moneyandmonitory.user_management_service.DTO.ForgotPasswordRequestDTO;
import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
@Slf4j
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    //Api for user registration
    @PostMapping
    public User registerUser(@RequestBody User user){
        logger.info("Registering a new user: {}", user.getEmail());
        return userService.registerUser(user);
    }

    //Api for user login
    @GetMapping("/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password){
        logger.info("Login request for user with email: {}", email);
        return userService.login(email,password);
    }

    //Api for to get the user details
    @GetMapping("/{email}")
    public User userDetails(@PathVariable String email){
        logger.info("Fetching user details for email: {}", email);
        return userService.userDetails(email);
    }

    //Api to check if email entered while registration already exists
    @GetMapping("/checkEmailExists/{email}")
    public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
        boolean emailExists = userService.existsByEmail(email);
        logger.info("email exists output {}",emailExists);
        return ResponseEntity.ok(emailExists);
    }


    //Api to manage the round up feature
    @PutMapping("/roundup/{userId}")
    public void roundUpFeature(@PathVariable long userId){
        logger.info("Enabling/disabling round-up feature for user ID: {}", userId);
        userService.roundUpFeature(userId);
    }


    //Api to change the password if user forgets its
    @PutMapping("/forgotPassword")
    public ResponseEntity<ForgotPasswordRequestDTO> forgotPassword(@RequestBody ForgotPasswordRequestDTO forgotPasswordRequestDTO){
        logger.info("Initiating forgot password process for email: {}", forgotPasswordRequestDTO.getEmail());
        return userService.forgotPassword(forgotPasswordRequestDTO);
    }


    //Api for upadting the user profile
    @PutMapping("/updateprofile")
    public  ResponseEntity<User> updateProfile(@RequestBody User updateUser){
        logger.info("Updating user profile for user with email: {}", updateUser.getEmail());
        return userService.updateProfile(updateUser);
    }
}

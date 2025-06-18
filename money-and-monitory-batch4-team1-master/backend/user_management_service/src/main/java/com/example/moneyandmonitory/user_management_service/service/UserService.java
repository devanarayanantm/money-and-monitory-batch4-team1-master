package com.example.moneyandmonitory.user_management_service.service;

import com.example.moneyandmonitory.user_management_service.DTO.ForgotPasswordRequestDTO;
import com.example.moneyandmonitory.user_management_service.model.DebitAccount;
import com.example.moneyandmonitory.user_management_service.model.SavingsAccount;
import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.repository.DebitAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.SavingsAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

@Slf4j
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DebitAccountRepository debitAccountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    SavingsAccountRepository savingsAccountRepository;

    //service for user registeration
    public User registerUser(User user) {

        logger.info("Storing new user details ");
        User userBO = userRepository.save(user);
        DebitAccount debitAccount = new DebitAccount();
        debitAccount.setUserId(userBO.getUserId());
        debitAccount.roundUp=userBO.roundUpSavings;
        debitAccountRepository.save(debitAccount);

        if(userBO.roundUpSavings){
            SavingsAccount savingsAccount = new SavingsAccount();
            savingsAccount.setUserId(userBO.getUserId());
            savingsAccount.setSavingsAccountNumber(debitAccount.getSavingsAccountNumber());
            savingsAccount.setRoundUp(true);
            savingsAccountRepository.save(savingsAccount);
        }
        return userBO;
    }

    //service for user login
    public boolean login(String email, String password) {
        logger.info("Handling login request ");
        List<User> userList = userRepository.findAll();
        for(User user:userList){
            if(user.getEmail().equals(email) && user.getPassword().equals(password)){
                return true;
            }
        }

        return false;
    }

    //service for getting user details
    public User userDetails(String email) {
        logger.info("Fetching user details(inside service class)");
        List<User> userList = userRepository.findAll();
        for(User user:userList){
            if(user.getEmail().equals(email)){
                return user;
            }
        }

        return null;
    }


    //service for enabling roundup feature
    public void roundUpFeature(long userId) {

        logger.info("Inside RoundupFeature function in userservice class");
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        boolean roundup = !debitAccount.roundUp;
        Query query = new Query(Criteria.where("userId").is(userId));

        Update update = new Update().set("roundUp",roundup);

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        mongoTemplate.findAndModify(query, update, options, DebitAccount.class);

        User user = userRepository.findById(userId).orElse(null);
        user.roundUpSavings=roundup;
        userRepository.save(user);

        SavingsAccount savingAccount = savingsAccountRepository.findByuserId(userId);

        if(savingAccount==null){
            SavingsAccount savingsAccount = new SavingsAccount();
            savingsAccount.setUserId(userId);
            savingsAccount.setSavingsAccountNumber(debitAccount.getSavingsAccountNumber());
            savingsAccount.setRoundUp(roundup);
            savingsAccountRepository.save(savingsAccount);
        }
    }

    //service for changing password if user forgets it
    public ResponseEntity<ForgotPasswordRequestDTO> forgotPassword(ForgotPasswordRequestDTO forgotPasswordRequestDTO) {
        logger.info("Implementing forgot password process for email: {}", forgotPasswordRequestDTO.getEmail());
        User user = userRepository.findByemail(forgotPasswordRequestDTO.getEmail());
        System.out.println(user.getPassword());
        if(user.getPin()==forgotPasswordRequestDTO.getPin()){
            user.setPassword(forgotPasswordRequestDTO.getPassword());
            userRepository.save(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    //service to update user details
    public ResponseEntity<User> updateProfile(User updateUser) {

        logger.info("Implementing update user profile for user with email: {}", updateUser.getEmail());
        Optional<User> user = userRepository.findById(updateUser.getUserId());

        if(user.isPresent())
        {
            User foundUser = user.get();
            foundUser.setName(updateUser.getName());
            foundUser.setEmail(updateUser.getEmail());
            foundUser.setMobile(updateUser.getMobile());
            foundUser.setDob(updateUser.getDob());
            foundUser.setAddress(updateUser.getAddress());

            userRepository.save(foundUser);
            return new ResponseEntity<>(foundUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);



    }

    //service to check if user already exists
    public Boolean existsByEmail(String email) {

        return userRepository.existsByemail(email);

    }
}

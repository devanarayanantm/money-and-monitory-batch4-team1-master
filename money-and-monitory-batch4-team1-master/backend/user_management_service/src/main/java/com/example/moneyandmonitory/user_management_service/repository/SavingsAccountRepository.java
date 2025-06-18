package com.example.moneyandmonitory.user_management_service.repository;

import com.example.moneyandmonitory.user_management_service.model.SavingsAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SavingsAccountRepository extends MongoRepository<SavingsAccount,Long> {
    SavingsAccount findByuserId(long userId);
}

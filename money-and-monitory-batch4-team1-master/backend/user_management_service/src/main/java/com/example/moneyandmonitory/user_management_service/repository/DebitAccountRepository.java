package com.example.moneyandmonitory.user_management_service.repository;

import com.example.moneyandmonitory.user_management_service.model.DebitAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.UUID;
public interface DebitAccountRepository extends MongoRepository<DebitAccount, Long> {
    DebitAccount findByuserId(long userId);
}

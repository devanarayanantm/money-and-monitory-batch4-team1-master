package com.example.moneyandmonitory.account_service.Repository;

import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingsAccountRepository extends MongoRepository<SavingsAccount, Long> {
    SavingsAccount findByuserId(long userId);


}

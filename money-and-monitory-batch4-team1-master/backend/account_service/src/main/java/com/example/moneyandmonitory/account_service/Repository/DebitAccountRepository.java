package com.example.moneyandmonitory.account_service.Repository;

import com.example.moneyandmonitory.account_service.model.DebitAccount;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitAccountRepository extends MongoRepository<DebitAccount, Long> {

    DebitAccount findByuserId(long userId);
}

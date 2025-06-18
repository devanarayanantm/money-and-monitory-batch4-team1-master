package com.example.moneyandmonitory.user_management_service.repository;

import com.example.moneyandmonitory.user_management_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByemail(String email);

    Boolean existsByemail(String email);
}

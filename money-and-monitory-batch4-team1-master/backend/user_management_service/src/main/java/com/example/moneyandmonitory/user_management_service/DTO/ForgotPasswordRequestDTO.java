package com.example.moneyandmonitory.user_management_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordRequestDTO {
    private String email;
    private int pin;
    private String password;
}

package com.example.moneyandmonitory.account_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoneyTransferRequestDTO {

    private long userId;
    private long debitAccountNumber;
    private long receiverAccountNumber;
    private double amount;
    private int cvv;
}

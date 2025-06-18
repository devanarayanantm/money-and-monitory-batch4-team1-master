package com.example.moneyandmonitory.account_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "savingsAccount")
public class SavingsAccount {
    private long savingsAccountNumber;
    private long userId;
    private String accountType;
    private double balance;
    public boolean roundUp;
    private List<Transaction> transactions;
    private Date lockAccount;
}

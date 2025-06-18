package com.example.moneyandmonitory.user_management_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@Document(collection = "savingsAccount")
public class SavingsAccount {

    private long savingsAccountNumber;
    private long userId;
    private String accountType;
    private double balance;
    public boolean roundUp;
    private List<Transaction> transaction;
    private Date lockAccount;

    public SavingsAccount() {
        this.accountType = "Savings";
        this.balance = 0.0;
        this.roundUp=false;
        this.lockAccount=new Date();
    }
}

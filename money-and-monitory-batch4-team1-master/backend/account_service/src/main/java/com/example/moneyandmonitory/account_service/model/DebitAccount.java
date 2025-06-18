package com.example.moneyandmonitory.account_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "debitAccount")
public class DebitAccount {
    private long debitAccountNumber;
    private long userId;
    private String accountType;
    private double balance;
    private long savingsAccountNumber;
    public boolean roundUp;
    private List<Transaction> transactions;
    private Card card;
}

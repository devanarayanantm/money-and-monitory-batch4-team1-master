package com.example.moneyandmonitory.user_management_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.example.moneyandmonitory.user_management_service.UniqueAccountNumber.AccountNumber.getID;

@Data
@AllArgsConstructor
@Document(collection = "debitAccount")
public class DebitAccount {

    private long debitAccountNumber;
    private long userId;
    private String accountType;
    private double balance;
    private long savingsAccountNumber;
    public boolean roundUp;
    private List<Transaction> transaction;
    private Card card;

    public DebitAccount() {
        this.debitAccountNumber=getID();
        this.accountType = "Debit";
        this.balance = 0.0;
        this.savingsAccountNumber=getID()*10+getID()%10;
        this.card=new Card();
    }
}

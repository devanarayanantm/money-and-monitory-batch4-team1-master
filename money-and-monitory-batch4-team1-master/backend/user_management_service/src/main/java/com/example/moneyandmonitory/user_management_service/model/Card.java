package com.example.moneyandmonitory.user_management_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

import static com.example.moneyandmonitory.user_management_service.UniqueAccountNumber.AccountNumber.getID;

@Data
@AllArgsConstructor
public class Card {

    private long cardNumber;
    private long cvv;

    public Card() {
        this.cardNumber = getID()/10;
        this.cvv = (int) (Math.random() * 900) + 100;
    }
}

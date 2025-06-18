package com.example.moneyandmonitory.account_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {

    private long cardNumber;
    private long cvv;

}

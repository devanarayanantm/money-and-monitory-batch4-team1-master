package com.example.moneyandmonitory.user_management_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private Date date;
    private String narration;
    private UUID referenceNumber;
    private double debited;
    private double credited;
    private double closingBalance;
}

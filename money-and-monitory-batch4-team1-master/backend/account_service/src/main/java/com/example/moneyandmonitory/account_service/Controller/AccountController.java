package com.example.moneyandmonitory.account_service.Controller;

import com.example.moneyandmonitory.account_service.DTO.MoneyTransferRequestDTO;
import com.example.moneyandmonitory.account_service.Service.AccountService;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/account")
@Slf4j
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private AccountService accountService;


    //Api to get debit account info of particular user using user id
    @GetMapping("/debitaccount/{userId}")
    public DebitAccount getDebitAccountInfo(@PathVariable long userId)
    {
        logger.info("Getting debit account information for userId: {}", userId);
        return accountService.getDebitAccountInfo(userId);
    }

    //Api to get savings account balance using user id
    @GetMapping("/savingsaccount/balance/{userId}")
    public double getSavingsAccountBalance(@PathVariable long userId)
    {
        logger.info("Getting savings account balance for userId: {}", userId);
        return accountService.getSavingsAccountBalance(userId);
    }

    //Api to get debit account balance using user id
    @GetMapping("/debitaccount/balance/{userId}")
    public double getDebitAccountBalance(@PathVariable long userId)
    {
        logger.info("Getting debit account balance for userId: {}", userId);
        return accountService.getDebitAccountBalance(userId);
    }


    //Api to get savings account information using user id
    @GetMapping("/savingsaccount/{userId}")
    public SavingsAccount getSavingsAccountInfo(@PathVariable long userId)
    {
        logger.info("Getting savings account information for userId: {}", userId);
        return accountService.getSavingsAccountInfo(userId);
    }


    //Api to withdraw money from savings account
    @PutMapping("/savingsaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(@PathVariable long userId, @PathVariable double amount)
    {
        logger.info("Withdrawing {} from savings account for userId: {}", amount, userId);
        return accountService.withdrawFromSavingsAccount(userId, amount);
    }

    //Api to deposit money to debit account
    @PutMapping("/debitaccount/deposit/{userId}/{amount}")
    public ResponseEntity<Transaction> depositToDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        logger.info("Depositing {} to debit account for userId: {}", amount, userId);
        return accountService.depositToDebitAccount(userId, amount);
    }

    //for payments page - withdraw from debit account
    @PutMapping("/debitaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        logger.info("Withdrawing {} from debit account for userId: {}", amount, userId);
        return accountService.withdrawFromDebitAccount(userId, amount,"Withdrawn");
    }

    //Api to transfer money from debit account to another and apply round up feature if applicable
    @PostMapping("/transfermoney")
    public ResponseEntity<Transaction> transferMoney(@RequestBody MoneyTransferRequestDTO moneyTransferRequestDTO)
    {
        logger.info("Transferring money: {} from account : {} to account : userId {}",
                moneyTransferRequestDTO.getAmount(), moneyTransferRequestDTO.getDebitAccountNumber(),
                moneyTransferRequestDTO.getReceiverAccountNumber());
        return accountService.transferMoney(moneyTransferRequestDTO);
    }

    //Api to get transaction history for debit account
    @GetMapping("/debit/transactionhistory/{userId}")
    public List<Transaction> transactionHistoryForDebitAccount(@PathVariable long userId){

        logger.info("Fetching transaction history for debit account of userId: {}", userId);
        //return accountService.transactionHistoryForDebitAccount(userId);

        List<Transaction> transactions = accountService.transactionHistoryForDebitAccount(userId);
        if(transactions == null)return Collections.emptyList();
        return transactions;

    }

    //Api to get transaction history for savings account
    @GetMapping("/savings/transactionhistory/{userId}")
    public List<Transaction> transactionHistoryForSavingsAccount(@PathVariable long userId){

        logger.info("Fetching transaction history for savings account of userId: {}", userId);
        //return accountService.transactionHistorySavingsAccount(userId);

        List<Transaction> transactions = accountService.transactionHistorySavingsAccount(userId);
        if(transactions == null)return Collections.emptyList();
        return transactions;

    }

    //Api to lock savings account for specified period of time
    @PutMapping("lockaccount/{userId}/{date}")
    public void lockAccount(@PathVariable long userId, @PathVariable Date date){
        logger.info("Locking account for userId: {} until date: {}", userId, date);
        accountService.lockAccount(userId,date);
    }

    //Api to enable round up feature
    @PutMapping("/roundup/{userId}/{roundup}")
    public void roundUpFeature(@PathVariable long userId){
        logger.info("Enabling round-up feature for userId: {}", userId);
        accountService.roundUpFeature(userId);
    }
}


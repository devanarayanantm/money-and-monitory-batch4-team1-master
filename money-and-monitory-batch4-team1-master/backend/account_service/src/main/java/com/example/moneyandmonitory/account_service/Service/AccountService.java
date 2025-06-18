package com.example.moneyandmonitory.account_service.Service;

import com.example.moneyandmonitory.account_service.DTO.MoneyTransferRequestDTO;
import com.example.moneyandmonitory.account_service.Repository.DebitAccountRepository;
import com.example.moneyandmonitory.account_service.Repository.SavingsAccountRepository;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;


@Service
@Slf4j
public class AccountService {

    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private DebitAccountRepository debitAccountRepository;

    @Autowired
    private SavingsAccountRepository savingsAccountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    //service to get debit account details using user ID
    public DebitAccount getDebitAccountInfo(long userId) {

        return debitAccountRepository.findByuserId(userId);
    }

    //service to get savings account details using user ID
    public SavingsAccount getSavingsAccountInfo(long userId) {

        return savingsAccountRepository.findByuserId(userId);
    }

    //service to create transaction and assigned a reference ID to that transaction using UUID
    private Transaction createTransaction(double amount, String narration, double closingBalance) {
        TimeZone tz = TimeZone.getTimeZone("Asia/Kolkata");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm'Z'"); // Quoted "Z" to indicate UTC, no timezone offset
        df.setTimeZone(tz);
        String nowAsISO = df.format(new Date());
        if(amount < 0)
        {
            return new Transaction(nowAsISO,narration , UUID.randomUUID(), -amount, 0, closingBalance);
        }
        return new Transaction(nowAsISO,narration , UUID.randomUUID(), 0,amount, closingBalance);
    }
    @Transactional
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(long userId, double amount) {
        logger.info("Inside WithdrawFromSavingsAccount function in Account service");

        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        Date date = new Date();
        if(date.after(savingsAccount.getLockAccount())) {
            double curBal = savingsAccount.getBalance();

            if (curBal < amount) {
                logger.warn("Insufficient funds for withdrawal. userId: {}, current balance: {}", userId, curBal);
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            double closingBal = curBal - amount;
            Query query = new Query(Criteria.where("userId").is(userId));
            Transaction t = createTransaction(-amount, "Withdrawn Money", closingBal);

            Update update = new Update()
                    .inc("balance", -amount)  // Decrement the balance by the specified amount
                    .push("transactions", t); // Add the new transaction

            FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);
            SavingsAccount savingsAccount1 = mongoTemplate.findAndModify(query, update, options, SavingsAccount.class);
            if (savingsAccount1 != null) {
                logger.info("Withdrawal from savings account successful for userId: {}, amount: {}", userId, amount);
                return new ResponseEntity<>(t, HttpStatus.OK);
            } else {
                logger.error("Withdrawal from savings account failed for userId: {}", userId);
                return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
            }
        }else {
            logger.warn("Withdrawal request denied due to account lock. userId: {}", userId);
            return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
        }
    }

    //service to deposit money to depit account
    public ResponseEntity<Transaction> depositToDebitAccount(long userId, double amount) {

        logger.info("Deposit request for debit account of userId: {}, amount: {}", userId, amount);
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        Query query = new Query(Criteria.where("userId").is(userId));
        double newBalance = curBal + amount;
        Transaction t = createTransaction(amount, "Deposited Money", newBalance);
        Update update = new Update()
                .inc("balance", amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction
        DebitAccount modifiedAcc = mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), DebitAccount.class);

        if(modifiedAcc != null)
        {
            logger.info("Deposit to debit account successful for userId: {}, amount: {}", userId, amount);
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        else {
            logger.error("Deposit to debit account failed for userId: {}", userId);
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        }

    }

    //service to deposit money to savings account
    public ResponseEntity<Transaction> depositToSavingsAccount(long userId, double amount) {
        logger.info("Inside depositToSavingsAccount Function in Account service");
        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        double curBal = savingsAccount.getBalance();
        Query query = new Query(Criteria.where("userId").is(userId));
        double newBalance = curBal + amount;
        Transaction t = createTransaction(amount, "Credited Round Up amount", newBalance);
        Update update = new Update()
                .inc("balance", amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction
        SavingsAccount modifiedAcc = mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), SavingsAccount.class);

        if(modifiedAcc != null)
        {
            logger.info("Deposit to savings account successful for userId: {}, amount: {}", userId, amount);
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        else {
            logger.error("Deposit to debit account failed for userId: {}", userId);
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        }

    }

    //service to withdraw money from debit account
    public ResponseEntity<Transaction> withdrawFromDebitAccount(long userId, double amount, String narration) {
        logger.info("Inside WithdrawFromDebitAccount function in Account service");
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        if(curBal < amount)
        {
            return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
        }

        double closingBal = curBal - amount;
        Query query = new Query(Criteria.where("userId").is(userId));
        //String narration = "debited " + amount ;
        Transaction t =  createTransaction(-amount, narration, closingBal);

        Update update = new Update()
                .inc("balance", -amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        DebitAccount debitAccount1 = mongoTemplate.findAndModify(query, update, options, DebitAccount.class);

        if(debitAccount1 != null) {
            logger.info("Withdrawal from debit account successful for userId: {}, amount: {}", userId, amount);
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        logger.error("Withdrawal from debit account failed for userId: {}", userId);
        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);

    }

    //service to get balance from savings account
    public double getSavingsAccountBalance(long userId) {
        logger.info("Inside getSavingsAccountBalance function in account service");
        return Double.parseDouble(new DecimalFormat("#.00").format(savingsAccountRepository.findByuserId(userId).getBalance()));
        //return savingsAccountRepository.findByuserId(userId).getBalance();
    }

    //service to get balance from debit account
    public double getDebitAccountBalance(long userId) {
        logger.info("Inside getDebitAccountBalance function in account service");
        return debitAccountRepository.findByuserId(userId).getBalance();
    }
    public ResponseEntity<Transaction> transferMoney(MoneyTransferRequestDTO moneyTransferRequestDTO) {
        logger.info("Money transfer request initiated (inside Account service class) ");

        MoneyTransferRequestDTO mt=moneyTransferRequestDTO;
        DebitAccount debitAccount = debitAccountRepository.findByuserId(mt.getUserId());
        double finalAmount = mt.getAmount();
        if(debitAccount.roundUp==true){

            finalAmount=Math.ceil(mt.getAmount());
            double savingsAmount=finalAmount-mt.getAmount();
            //round-up upto two decimal places
            savingsAmount = Double.parseDouble(new DecimalFormat("#.00").format(savingsAmount));
            depositToSavingsAccount(debitAccount.getUserId(),savingsAmount);
            logger.info("Round-up is performed");
        }
        logger.info("Round-up disabled so normal payment is done");
        String narration="Transfered to account number " +mt.getReceiverAccountNumber();
        return withdrawFromDebitAccount(debitAccount.getUserId(),finalAmount,narration);
    }

    //service to get transaction history from debit account
    public List<Transaction> transactionHistoryForDebitAccount(long userId) {
        logger.info("Indside transactionhistoryfordebitaccount function in account service");
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        System.out.println(debitAccount.getDebitAccountNumber());
        System.out.println(debitAccount.getTransactions());
        return debitAccount.getTransactions();
    }


    //service to get transaction history from savings account
    public List<Transaction> transactionHistorySavingsAccount(long userId) {
        logger.info("Inside transactionhistoryfordebitaccount function in account service");
        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        return savingsAccount.getTransactions();
    }

    //service to lock savings account for particular period
    public void lockAccount(long userId,Date lockDate) {

        logger.info("Inside lockAccount function in account service");
        Query query = new Query(Criteria.where("userId").is(userId));

        Update update = new Update().set("lockAccount",lockDate);

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        mongoTemplate.findAndModify(query, update, options, SavingsAccount.class);

    }

    //service to enable/disable round up feature
    public void roundUpFeature(long userId) {
        logger.info("Inside roundUpFeature function in account service");
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        boolean roundup = !debitAccount.roundUp;
        Query query = new Query(Criteria.where("userId").is(userId));

        Update update = new Update().set("roundUp",roundup);

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        mongoTemplate.findAndModify(query, update, options, DebitAccount.class);
    }
}

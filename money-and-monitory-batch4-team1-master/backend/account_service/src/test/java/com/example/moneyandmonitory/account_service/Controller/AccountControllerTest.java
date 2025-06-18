package com.example.moneyandmonitory.account_service.Controller;

import com.example.moneyandmonitory.account_service.Service.AccountService;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AccountService mockAccountService;

    @Test
    void testGetDebitAccountInfoWithBasicAuth() throws Exception {
        // Setup
        // Configure AccountService.getDebitAccountInfo(...).
        final DebitAccount debitAccount = new DebitAccount();
        debitAccount.setDebitAccountNumber(122134L);
        debitAccount.setUserId(5L);
        debitAccount.setAccountType("Debit");
        debitAccount.setBalance(40.0);
        when(mockAccountService.getDebitAccountInfo(5L)).thenReturn(debitAccount);

        // Run the test with Basic Authentication
        long userId = debitAccount.getUserId();
        mockMvc.perform(MockMvcRequestBuilders.get("/account/debitaccount/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId").value(userId));
    }


    @Test
    void testGetSavingsAccountBalanceWithBasicAuth() throws Exception {
        // Setup
        final SavingsAccount savingsAccount = new SavingsAccount();
        savingsAccount.setSavingsAccountNumber(1134L);
        savingsAccount.setUserId(501L);
        savingsAccount.setAccountType("Savings");
        savingsAccount.setBalance(420.0);

        // Run the test with Basic Authentication
        long userId = savingsAccount.getUserId();
        double balance = savingsAccount.getBalance();
        when(mockAccountService.getSavingsAccountBalance(userId)).thenReturn(balance);

        // Run the test with Basic Authentication
        mockMvc.perform(MockMvcRequestBuilders.get("/account/savingsaccount/balance/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(String.valueOf(balance)));
    }

    @Test
    void testGetDebitAccountBalanceWithBasicAuth() throws Exception {
        // Setup
        final DebitAccount DebitAccount = new DebitAccount();
        DebitAccount.setDebitAccountNumber(1664L);
        DebitAccount.setUserId(502L);
        DebitAccount.setAccountType("Debit");
        DebitAccount.setBalance(7500.0);

        // Run the test with Basic Authentication
        long userId = DebitAccount.getUserId();
        double balance = DebitAccount.getBalance();
        when(mockAccountService.getDebitAccountBalance(userId)).thenReturn(balance);

        // Run the test with Basic Authentication
        mockMvc.perform(MockMvcRequestBuilders.get("/account/debitaccount/balance/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(String.valueOf(balance)));
    }
}


package com.example.moneyandmonitory.user_management_service.controller;

import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
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


import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService mockUserService;

    @Test
    void testRegisterUser() throws Exception {
        // Setup
        final User user1 = new User();
        user1.setUserId(123L);
        user1.setName("name");
        user1.setEmail("email");
        user1.setMobile("mobile");
        user1.setDob("dob");
        //configure
        when(mockUserService.registerUser(user1)).thenReturn(user1);

        // Convert user1 to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user1);

        // Run the test
        mockMvc.perform(MockMvcRequestBuilders.post("/user")
                        .content(userJson)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userJson));
    }

    @Test
    void testLogin() throws Exception {
        // Prepare test data
        final User user = new User();
        user.setUserId(123L);
        user.setName("name");
        user.setEmail("abcdef@gmail.com");
        user.setMobile("mobile");
        user.setDob("dob");
        user.setPassword("ABCde@123");

        String email = user.getEmail();
        String password = user.getPassword();
        //configure
        when(mockUserService.login(email, password)).thenReturn(true);

        // Run the test
        mockMvc.perform(MockMvcRequestBuilders.get("/user/{email}/{password}", email, password)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true")); // Assuming your login endpoint returns "true" or "false" as a string
    }

    @Test
    void testUserDetails() throws Exception {
        // Setup
        // Configure UserService.userDetails(...).
        final User user = new User();
        user.setUserId(0L);
        user.setName("name");
        user.setEmail("email123@gmail.com");
        user.setMobile("mobile");
        user.setDob("dob");
        String email = user.getEmail();
        when(mockUserService.userDetails(email)).thenReturn(user);
        // Convert user1 to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/user/{email}", email)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory"))) // Add Basic Authentication
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(userJson));
    }

    @Test
    void testRoundUpFeature() throws Exception {
        // Prepare test data
        final User user = new User();
        user.setUserId(139L);
        user.setName("name");
        user.setEmail("abcdef@gmail.com");
        user.setMobile("mobile");
        user.setDob("dob");
        user.setPassword("ABCde@123");
        user.setRoundUpSavings(true);
        long userId = user.getUserId();

        // Configure the mock
        doNothing().when(mockUserService).roundUpFeature(userId);

        // Run the test
        mockMvc.perform(MockMvcRequestBuilders.put("/user/roundup/{userId}", userId)
                        .with(SecurityMockMvcRequestPostProcessors.httpBasic("MSUser", "moneyAndMonitory")) // Add Basic Authentication
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());

        // Verify that the roundUpFeature method was called
        verify(mockUserService, times(1)).roundUpFeature(userId);
    }
}

package com.asm.asm2.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Random;

import com.asm.asm2.Models.User;
import com.asm.asm2.Services.EmailService;
import com.asm.asm2.Services.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {

    private UserService userService;
    private EmailService emailService;

    public void setUserService(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Set the content type to application/json
        response.setContentType("application/json");

        // Get the verification code from the request
        String verifyCode = request.getParameter("verifyCode");

        PrintWriter out = response.getWriter();
        ObjectMapper objectMapper = new ObjectMapper();

        // Check if verifyCode is present
        if (verifyCode != null && !verifyCode.isEmpty()) {
            try {
                User existingUser = userService.getUserByVerifyStatusCode(verifyCode);
                if (existingUser != null) {
                    User updatedUser = userService.updateByStatusByID(existingUser.getId(), existingUser);
                    String updatedUserJson = objectMapper.writeValueAsString(updatedUser);
                    response.setStatus(HttpServletResponse.SC_OK);
                    out.print(updatedUserJson);
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print("{\"error\": \"User not found\"}");
                }
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.print("{\"error\": \"An error occurred while verifying the user.\"}");
            }
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid or missing verifyCode\"}");
        }

        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read the request body
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String requestBody = stringBuilder.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(requestBody);

        // Extract fields
        String fullname = jsonNode.get("fullname").asText();
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();
        int roleId = jsonNode.get("roleId").asInt();

        // Generate a random 6-digit status number
        int status = 100000 + new Random().nextInt(900000);

        // Create a new user with the generated status
        User newUser = new User(fullname, email, password, roleId, "", "", "", "", String.valueOf(status));

        // Add the user to the database
        userService.addUser(newUser);

        // Send an email to the user
        String subject = "Welcome to Work CV!";
        String message = "Hello " + fullname
                + ",\n\nYour account has been created successfully.\nPlease click to the link to verify your account: "
                + "http://localhost:3000/verify/" + status;

        System.out.println("http://localhost:3000/verify/" + status);

        emailService.sendEmail(email, subject, message);

        // Send a response back with a success message
        PrintWriter out = response.getWriter();
        out.print("{\"message\": \"User added successfully, status number: " + status + "\"}");
        out.flush();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Read the request body
        StringBuilder stringBuilder = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        }
        String requestBody = stringBuilder.toString();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(requestBody);

        // Extract fields
        int userId = jsonNode.get("id").asInt(); // Assuming the user ID is passed for updating
        String fullname = jsonNode.get("fullname").asText();
        String email = jsonNode.get("email").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        String address = jsonNode.get("address").asText();
        String description = jsonNode.get("description").asText();
        String avatar = jsonNode.get("avatar").asText();

        // Retrieve the existing user from the database using the ID
        User existingUser = userService.updateUser(userId, fullname, email, phoneNumber, address, description, avatar);

        if (existingUser != null) {
            // Send a response back with a success message
            String existingUserJson = objectMapper.writeValueAsString(existingUser);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print(existingUserJson);
            out.flush();
        } else {
            // If user not found, return a 404 status
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"message\": \"User not found\"}");
            out.flush();
        }
    }

}

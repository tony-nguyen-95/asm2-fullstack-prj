package com.asm.asm2.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

import com.asm.asm2.Models.Company;
import com.asm.asm2.Services.CompanyService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/companies")
public class CompanyServlet extends HttpServlet {

    private CompanyService companyService;

    public void setCompanyService(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Get the userId parameter from the request
        String userIdParam = request.getParameter("userId");

        ObjectMapper objectMapper = new ObjectMapper();
        PrintWriter out = response.getWriter();

        try {
            if (userIdParam != null && !userIdParam.isEmpty()) {
                // If userId parameter is present, fetch the specific company
                int userId = Integer.parseInt(userIdParam);
                Company company = companyService.getCompanyByUserId(userId);

                // Write the single company to the response
                out.print(objectMapper.writeValueAsString(company));
            } else {
                // If userId parameter is null, fetch all companies
                List<Company> companies = companyService.getAllCompanies();

                // Write the list of companies to the response
                out.print(objectMapper.writeValueAsString(companies));
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid userId format\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"An error occurred while processing the request\"}");
        } finally {
            out.flush();
        }
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
        String address = jsonNode.get("address").asText();
        String description = jsonNode.get("description").asText();
        String email = jsonNode.get("email").asText();
        String logo = jsonNode.get("logo").asText();
        String nameCompany = jsonNode.get("nameCompany").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        int userId = jsonNode.get("userId").asInt();

        Company newCompany = new Company(address, description, email, logo, nameCompany, phoneNumber,
                userId);

        companyService.addCompany(newCompany);

        response.setStatus(HttpServletResponse.SC_CREATED);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(newCompany));
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
        int companyId = jsonNode.get("id").asInt(); // Assuming the company ID is passed for updating
        String address = jsonNode.get("address").asText();
        String description = jsonNode.get("description").asText();
        String email = jsonNode.get("email").asText();
        String logo = jsonNode.get("logo").asText();
        String nameCompany = jsonNode.get("nameCompany").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        int userId = jsonNode.get("userId").asInt();

        // Update the existing company
        int existingCompany = companyService.updateCompany(companyId, address, description, email, logo, nameCompany,
                phoneNumber, userId);

        if (existingCompany > 0) {
            // Send a response back with a success message
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"message\": \"Company updated successfully\"}");
            out.flush();
        } else {
            // If company not found, return a 404 status
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"message\": \"Company not found\"}");
            out.flush();
        }
    }
}

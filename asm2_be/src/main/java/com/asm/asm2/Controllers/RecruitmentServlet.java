package com.asm.asm2.Controllers;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

import com.asm.asm2.Models.Recruitment;
import com.asm.asm2.Services.RecruitmentService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/api/recruitments")
public class RecruitmentServlet extends HttpServlet {

    private RecruitmentService recruitmentService;

    public void setRecruitmentService(RecruitmentService recruitmentService) {
        this.recruitmentService = recruitmentService;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String companyIdParam = request.getParameter("companyId");

        List<Recruitment> recruitments;
        if (companyIdParam == null) {

            recruitments = recruitmentService.getAllRecruitmentsWithCompany();
        } else {
            int companyId = Integer.parseInt(companyIdParam);
            recruitments = recruitmentService.getRecruitmentsByCompanyId(companyId);
        }

        ObjectMapper objectMapper = new ObjectMapper();

        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(recruitments));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

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
        String title = jsonNode.get("title").asText();
        String description = jsonNode.get("description").asText();
        String experience = jsonNode.get("experience").asText();
        String quality = jsonNode.get("quality").asText();
        String address = jsonNode.get("address").asText();
        String deadlineString = jsonNode.get("deadline").asText();
        double salary = jsonNode.get("salary").asDouble();
        String type = jsonNode.get("type").asText();
        int companyId = jsonNode.get("companyId").asInt();
        int categoryId = jsonNode.get("categoryId").asInt();

        Recruitment newRecruitment = new Recruitment(address, description, experience, quality, salary,
                title, type, companyId, categoryId, deadlineString);

        recruitmentService.addRecruitment(newRecruitment);

        response.setStatus(HttpServletResponse.SC_CREATED);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(objectMapper.writeValueAsString(newRecruitment));
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
        int recruitmentId = jsonNode.get("id").asInt(); // Assuming the recruitment ID is passed for updating
        String address = jsonNode.get("address").asText();
        String description = jsonNode.get("description").asText();
        String experience = jsonNode.get("experience").asText();
        String quality = jsonNode.get("quality").asText();
        int ranking = jsonNode.get("ranking").asInt();
        double salary = jsonNode.get("salary").asDouble();
        String status = jsonNode.get("status").asText();
        String title = jsonNode.get("title").asText();
        String type = jsonNode.get("type").asText();
        int view = jsonNode.get("view").asInt();
        int companyId = jsonNode.get("companyId").asInt();
        int categoryId = jsonNode.get("categoryId").asInt();
        String deadlineString = jsonNode.get("deadline").asText();

        // Update the existing recruitment
        int updatedRecruitment = recruitmentService.updateRecruitment(recruitmentId, address, description, experience,
                quality, ranking, salary, status, title, type, view, companyId, categoryId, deadlineString);

        if (updatedRecruitment > 0) {
            // Send a response back with a success message
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"message\": \"Recruitment updated successfully\"}");
            out.flush();
        } else {
            // If recruitment not found, return a 404 status
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.setContentType("application/json");
            PrintWriter out = response.getWriter();
            out.print("{\"message\": \"Recruitment not found\"}");
            out.flush();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));

        // Delete the tour using the service
        int rowsAffected = recruitmentService.deleteRecruitment(id);

        // Send a response back indicating success or failure
        PrintWriter out = resp.getWriter();
        if (rowsAffected > 0) {
            resp.setStatus(HttpServletResponse.SC_OK);
            out.print("{\"message\": \"Recruitment deleted successfully\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print("{\"message\": \"Recruitment not found\"}");
        }
        out.flush();
    }
}

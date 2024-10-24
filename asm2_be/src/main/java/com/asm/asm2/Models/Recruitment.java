package com.asm.asm2.Models;

public class Recruitment {
    private int id;
    private String address;
    private String createdAt;
    private String description;
    private String experience;
    private String quality;
    private int ranking;
    private double salary;
    private String status;
    private String title;
    private String type;
    private int view;
    private int companyId;
    private int categoryId;
    private String deadline;
    private String companyName;
    private int appliesCount;

    // Constructor
    public Recruitment() {
    }

    public Recruitment(String address, String description, String experience,
            String quality, double salary, String title, String type, int companyId,
            int categoryId, String deadline) {
        this.address = address;
        this.description = description;
        this.experience = experience;
        this.quality = quality;
        this.salary = salary;
        this.title = title;
        this.type = type;
        this.companyId = companyId;
        this.categoryId = categoryId;
        this.deadline = deadline;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public int getRanking() {
        return ranking;
    }

    public void setRanking(int ranking) {
        this.ranking = ranking;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getAppliesCount() {
        return appliesCount;
    }

    public void setAppliesCount(int appliesCount) {
        this.appliesCount = appliesCount;
    }

}

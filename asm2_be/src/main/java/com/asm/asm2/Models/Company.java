package com.asm.asm2.Models;

public class Company {
    private int id;
    private String address;
    private String description;
    private String email;
    private String logo;
    private String nameCompany;
    private String phoneNumber;
    private String status;
    private int userId;
    private int reCount;

    // Constructors
    public Company() {
    }

    public Company(String address, String description, String email, String logo, String nameCompany,
            String phoneNumber, int userId) {
        this.address = address;
        this.description = description;
        this.email = email;
        this.logo = logo;
        this.nameCompany = nameCompany;
        this.phoneNumber = phoneNumber;
        this.userId = userId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getNameCompany() {
        return nameCompany;
    }

    public void setNameCompany(String nameCompany) {
        this.nameCompany = nameCompany;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getReCount() {
        return reCount;
    }

    public void setReCount(int reCount) {
        this.reCount = reCount;
    }

}

package com.asm.asm2.Models;

public class User {
    private int id;
    private String password;
    private String fullname;
    private String email;
    private int roleId;
    private String address;
    private String description;
    private String phoneNumber;
    private String avatar;
    private String status;

    // Constructor with parameters
    public User(String fullname, String email, String password, int roleId, String address, String description,
            String phoneNumber, String avatar, String status) {
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.roleId = roleId;
        this.avatar = avatar;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.status = status;
    }

    // default
    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}

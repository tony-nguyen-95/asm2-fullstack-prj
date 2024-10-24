package com.asm.asm2.Models;

public class FollowCompany {
    private int id;
    private int companyId;
    private int userId;
    private String companyName;

    public FollowCompany() {
    }

    public FollowCompany(int companyId, int userId) {
        this.companyId = companyId;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}

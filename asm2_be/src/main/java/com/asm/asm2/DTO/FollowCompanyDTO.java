package com.asm.asm2.DTO;

public class FollowCompanyDTO {
    private int companyId;
    private int userId;

    // Default constructor
    public FollowCompanyDTO() {
    }

    // Constructor with fields
    public FollowCompanyDTO(int companyId, int userId) {
        this.companyId = companyId;
        this.userId = userId;
    }

    // Getters and Setters
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
}

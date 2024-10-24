package com.asm.asm2.Models;

public class CV {
    private int id;
    private String fileName;
    private int userId;

    public CV() {
    }

    // Constructor
    public CV(String fileName, int userId) {
        this.fileName = fileName;
        this.userId = userId;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

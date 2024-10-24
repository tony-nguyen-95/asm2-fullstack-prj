package com.asm.asm2.Services;

import com.asm.asm2.Models.CV;
import com.asm.asm2.Repositories.CVRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CVService {

    @Autowired
    private CVRepository cvRepository;

    public List<CV> getAllCVs() {
        return cvRepository.findAll();
    }

    public CV getCVById(int id) {
        return cvRepository.findById(id);
    }

    public CV getCVByFilename(String fileName) {
        return cvRepository.findByFilename(fileName);
    }

    public List<CV> getCVsByUserId(int userId) {
        return cvRepository.findByUserId(userId);
    }

    public void addCV(CV cv) {
        cvRepository.save(cv);
    }

    public boolean updateCV(int id, CV updatedCV) {
        int rowsAffected = cvRepository.updateById(id, updatedCV);
        return rowsAffected > 0;
    }

    public boolean deleteCV(int id) {
        int rowsAffected = cvRepository.deleteById(id);
        return rowsAffected > 0;
    }
}

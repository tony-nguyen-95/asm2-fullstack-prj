package com.asm.asm2.Services;

import com.asm.asm2.Models.ApplyRecruitment;
import com.asm.asm2.Repositories.ApplyRecruitmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplyRecruitmentService {

    @Autowired
    private ApplyRecruitmentRepository applyRecruitmentRepository;

    public List<ApplyRecruitment> getAllApplications() {
        return applyRecruitmentRepository.findAll();
    }

    public ApplyRecruitment getApplicationById(int id) {
        return applyRecruitmentRepository.findById(id);
    }

    public List<ApplyRecruitment> getApplicationsByRecruitmentId(int recruitmentId) {
        return applyRecruitmentRepository.findByRecruitmentId(recruitmentId);
    }

    public int addApplication(ApplyRecruitment applyRecruitment) {
        return applyRecruitmentRepository.save(applyRecruitment);
    }

    public boolean isApplied(int userId, int reId) {
        return applyRecruitmentRepository.checkApplied(userId, reId) != null;
    }

    public int approveStatusApplication(int applyId) {
        return applyRecruitmentRepository.updateStatus(applyId);
    }

    public List<ApplyRecruitment> getApplicationsByUserId(int userId) {
        return applyRecruitmentRepository.findByUserId(userId);
    }
}

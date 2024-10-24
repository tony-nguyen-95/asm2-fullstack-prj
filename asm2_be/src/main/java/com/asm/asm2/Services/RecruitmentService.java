package com.asm.asm2.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.asm2.Models.Recruitment;
import com.asm.asm2.Repositories.RecruitmentRepository;

import java.util.List;

@Service
public class RecruitmentService {

    @Autowired
    private RecruitmentRepository recruitmentRepository;

    public List<Recruitment> getAllRecruitmentsWithCompany() {
        return recruitmentRepository.findAllWithApplyCountAndCompanyName();
    }

    // Add a new recruitment entry
    public int addRecruitment(Recruitment recruitment) {
        return recruitmentRepository.save(recruitment);
    }

    // Retrieve a recruitment by ID
    public Recruitment getRecruitmentById(int id) {
        return recruitmentRepository.findById(id);
    }

    // Retrieve recruitment entries by company ID
    public List<Recruitment> getRecruitmentsByCompanyId(int companyId) {
        return recruitmentRepository.findByCompanyId(companyId);
    }

    // Update an existing recruitment entry
    public int updateRecruitment(int id, String address, String description, String experience, String quality,
            int ranking, double salary, String status, String title, String type, int view,
            int companyId, int categoryId, String deadline) {
        Recruitment existingRecruitment = recruitmentRepository.findById(id);

        if (existingRecruitment != null) {
            existingRecruitment.setAddress(address);
            existingRecruitment.setDescription(description);
            existingRecruitment.setExperience(experience);
            existingRecruitment.setQuality(quality);
            existingRecruitment.setRanking(ranking);
            existingRecruitment.setSalary(salary);
            existingRecruitment.setStatus(status);
            existingRecruitment.setTitle(title);
            existingRecruitment.setType(type);
            existingRecruitment.setView(view);
            existingRecruitment.setCompanyId(companyId);
            existingRecruitment.setCategoryId(categoryId);
            existingRecruitment.setDeadline(deadline);

            // Save the updated recruitment back to the database
            return recruitmentRepository.updateById(id, existingRecruitment);
        } else {
            throw new RuntimeException("Recruitment not found with id: " + id);
        }
    }

    // Delete a recruitment entry
    public int deleteRecruitment(int id) {
        return recruitmentRepository.deleteById(id);
    }
}

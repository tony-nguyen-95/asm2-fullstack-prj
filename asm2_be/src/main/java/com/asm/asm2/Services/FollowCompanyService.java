package com.asm.asm2.Services;

import com.asm.asm2.Models.FollowCompany;
import com.asm.asm2.Repositories.FollowCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowCompanyService {

    @Autowired
    private FollowCompanyRepository followCompanyRepository;

    // Retrieve all follow company records
    public List<FollowCompany> getAllFollows() {
        return followCompanyRepository.findAll();
    }

    // Retrieve a follow company record by its ID
    public FollowCompany getFollowById(int id) {
        return followCompanyRepository.findById(id);
    }

    // Retrieve all follow company records for a specific company by its ID
    public List<FollowCompany> getFollowsByCompanyId(int companyId) {
        return followCompanyRepository.findByCompanyId(companyId);
    }

    // Retrieve all follow company records for a specific user by their ID
    public List<FollowCompany> getFollowsByUserId(int userId) {
        return followCompanyRepository.findByUserId(userId);
    }

    // Add a new follow company record
    public int addFollow(FollowCompany followCompany) {
        return followCompanyRepository.save(followCompany);
    }

    // Check if a user is following a specific company
    public boolean isUserFollowingCompany(int userId, int companyId) {
        return followCompanyRepository.checkIfUserFollowsCompany(userId, companyId) != null;
    }

    // Remove a follow company record by its ID
    public int removeFollowById(int id) {
        return followCompanyRepository.deleteById(id);
    }
}

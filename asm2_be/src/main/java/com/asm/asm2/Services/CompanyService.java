package com.asm.asm2.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.asm2.Models.Company;
import com.asm.asm2.Repositories.CompanyRepository;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public int addCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company getCompanyById(int id) {
        return companyRepository.findById(id);
    }

    public Company getCompanyByUserId(int userId) {
        return companyRepository.findByUserId(userId);
    }

    public int updateCompany(int id, String address, String description, String email, String logo,
            String nameCompany,
            String phoneNumber, int userId) {
        Company existingCompany = companyRepository.findById(id);

        if (existingCompany != null) {
            existingCompany.setAddress(address);
            existingCompany.setDescription(description);
            existingCompany.setEmail(email);
            existingCompany.setLogo(logo);
            existingCompany.setNameCompany(nameCompany);
            existingCompany.setPhoneNumber(phoneNumber);
            existingCompany.setUserId(userId);

            // Save the updated company back to the database
            return companyRepository.updateById(id, existingCompany);
        } else {
            throw new RuntimeException("Company not found with id: " + id);
        }
    }

    public int deleteCompany(long id) {
        return companyRepository.deleteById(id);
    }
}

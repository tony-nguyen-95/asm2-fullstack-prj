package com.asm.asm2.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm2.Models.Company;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CompanyRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Company> companyRowMapper = new RowMapper<Company>() {
        @Override
        public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
            Company company = new Company();
            company.setId(rs.getInt("id"));
            company.setAddress(rs.getString("address"));
            company.setDescription(rs.getString("description"));
            company.setEmail(rs.getString("email"));
            company.setLogo(rs.getString("logo"));
            company.setNameCompany(rs.getString("name_company"));
            company.setPhoneNumber(rs.getString("phone_number"));
            company.setStatus(rs.getString("status"));
            company.setUserId(rs.getInt("user_id"));
            return company;
        }
    };

    private RowMapper<Company> companyWithReCountRowMapper = new RowMapper<Company>() {
        @Override
        public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
            Company company = new Company();
            company.setId(rs.getInt("id"));
            company.setAddress(rs.getString("address"));
            company.setDescription(rs.getString("description"));
            company.setEmail(rs.getString("email"));
            company.setLogo(rs.getString("logo"));
            company.setNameCompany(rs.getString("name_company"));
            company.setPhoneNumber(rs.getString("phone_number"));
            company.setStatus(rs.getString("status"));
            company.setUserId(rs.getInt("user_id"));
            company.setReCount(rs.getInt("recruitment_count"));
            return company;
        }
    };

    public List<Company> findAll() {
        String sql = "SELECT c.*, COUNT(r.id) AS recruitment_count " +
                "FROM Company c " +
                "LEFT JOIN Recruitment r ON c.id = r.company_id " +
                "GROUP BY c.id ";

        return jdbcTemplate.query(sql, companyWithReCountRowMapper);
    }

    public Company findById(int id) {
        String sql = "SELECT * FROM Company WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, companyRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Company findByUserId(int useId) {
        String sql = "SELECT * FROM company WHERE user_id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, companyRowMapper, useId);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public int save(Company company) {
        String sql = "INSERT INTO Company (address, description, email, logo, name_company, phone_number, status, user_id) "
                +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                company.getAddress(),
                company.getDescription(),
                company.getEmail(),
                company.getLogo(),
                company.getNameCompany(),
                company.getPhoneNumber(),
                company.getStatus(),
                company.getUserId());

    }

    public int updateById(int id, Company company) {
        String sql = "UPDATE Company SET address = ?, description = ?, email = ?, logo = ?, name_company = ?, phone_number = ?, user_id = ? "
                +
                "WHERE id = ?";
        return jdbcTemplate.update(sql,
                company.getAddress(),
                company.getDescription(),
                company.getEmail(),
                company.getLogo(),
                company.getNameCompany(),
                company.getPhoneNumber(),
                company.getUserId(),
                id);

    }

    public int deleteById(long id) {
        String sql = "DELETE FROM Company WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}

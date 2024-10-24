package com.asm.asm2.Repositories;

import com.asm.asm2.Models.FollowCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class FollowCompanyRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to map rows of the result set to FollowCompany objects
    private RowMapper<FollowCompany> followCompanyRowMapper = new RowMapper<FollowCompany>() {
        @Override
        public FollowCompany mapRow(ResultSet rs, int rowNum) throws SQLException {
            FollowCompany followCompany = new FollowCompany();
            followCompany.setId(rs.getInt("id"));
            followCompany.setCompanyId(rs.getInt("company_id"));
            followCompany.setUserId(rs.getInt("user_id"));
            return followCompany;
        }
    };

    private RowMapper<FollowCompany> followCompanWithNameRowMapper = new RowMapper<FollowCompany>() {
        @Override
        public FollowCompany mapRow(ResultSet rs, int rowNum) throws SQLException {
            FollowCompany followCompany = new FollowCompany();
            followCompany.setId(rs.getInt("id"));
            followCompany.setCompanyId(rs.getInt("company_id"));
            followCompany.setUserId(rs.getInt("user_id"));
            followCompany.setCompanyName(rs.getString("name_company"));
            return followCompany;
        }
    };

    // Save a new FollowCompany record
    public int save(FollowCompany followCompany) {
        String sql = "INSERT INTO follow_company (company_id, user_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql,
                followCompany.getCompanyId(),
                followCompany.getUserId());
    }

    // Find all FollowCompany records
    public List<FollowCompany> findAll() {
        String sql = "SELECT * FROM follow_company";
        return jdbcTemplate.query(sql, followCompanyRowMapper);
    }

    // Find a FollowCompany record by its ID
    public FollowCompany findById(int id) {
        String sql = "SELECT * FROM follow_company WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, followCompanyRowMapper, id);
    }

    // Find FollowCompany records by companyId
    public List<FollowCompany> findByCompanyId(int companyId) {
        String sql = "SELECT * FROM follow_company WHERE company_id = ?";
        return jdbcTemplate.query(sql, followCompanyRowMapper, companyId);
    }

    // Find FollowCompany records by userId
    public List<FollowCompany> findByUserId(int userId) {
        String sql = "SELECT fc.*, c.name_company FROM follow_company fc " +
                "JOIN company c ON fc.company_id = c.id " +
                "WHERE fc.user_id = ?";
        return jdbcTemplate.query(sql, followCompanWithNameRowMapper, userId);
    }

    // Check if a user is following a company
    public FollowCompany checkIfUserFollowsCompany(int userId, int companyId) {
        String sql = "SELECT * FROM follow_company WHERE user_id = ? AND company_id = ?";
        List<FollowCompany> result = jdbcTemplate.query(sql, followCompanyRowMapper, userId, companyId);
        return result.isEmpty() ? null : result.get(0);
    }

    // Delete a FollowCompany record by ID
    public int deleteById(int id) {
        String sql = "DELETE FROM follow_company WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}

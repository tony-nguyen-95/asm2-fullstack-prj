package com.asm.asm2.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm2.Models.Recruitment;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RecruitmentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Recruitment> recruitmentRowJoinWithCompanyMapper = new RowMapper<Recruitment>() {
        @Override
        public Recruitment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Recruitment recruitment = new Recruitment();
            recruitment.setId(rs.getInt("id"));
            recruitment.setAddress(rs.getString("address"));
            recruitment.setCreatedAt(rs.getString("created_at"));
            recruitment.setDescription(rs.getString("description"));
            recruitment.setExperience(rs.getString("experience"));
            recruitment.setQuality(rs.getString("quality"));
            recruitment.setRanking(rs.getInt("ranking"));
            recruitment.setSalary(rs.getDouble("salary"));
            recruitment.setStatus(rs.getString("status"));
            recruitment.setTitle(rs.getString("title"));
            recruitment.setType(rs.getString("type"));
            recruitment.setView(rs.getInt("view"));
            recruitment.setCompanyId(rs.getInt("company_id"));
            recruitment.setCategoryId(rs.getInt("category_id"));
            recruitment.setDeadline(rs.getString("deadline"));
            recruitment.setCompanyName(rs.getString("name_company"));
            return recruitment;
        }
    };

    private RowMapper<Recruitment> recruitmentRowMapper = new RowMapper<Recruitment>() {
        @Override
        public Recruitment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Recruitment recruitment = new Recruitment();
            recruitment.setId(rs.getInt("id"));
            recruitment.setAddress(rs.getString("address"));
            recruitment.setCreatedAt(rs.getString("created_at"));
            recruitment.setDescription(rs.getString("description"));
            recruitment.setExperience(rs.getString("experience"));
            recruitment.setQuality(rs.getString("quality"));
            recruitment.setRanking(rs.getInt("ranking"));
            recruitment.setSalary(rs.getDouble("salary"));
            recruitment.setStatus(rs.getString("status"));
            recruitment.setTitle(rs.getString("title"));
            recruitment.setType(rs.getString("type"));
            recruitment.setView(rs.getInt("view"));
            recruitment.setCompanyId(rs.getInt("company_id"));
            recruitment.setCategoryId(rs.getInt("category_id"));
            recruitment.setDeadline(rs.getString("deadline"));
            return recruitment;
        }
    };

    public List<Recruitment> findAll() {
        String sql = "SELECT * FROM Recruitment";
        return jdbcTemplate.query(sql, recruitmentRowMapper);
    }

    public List<Recruitment> findAllWithApplyCountAndCompanyName() {
        String sql = "SELECT r.*, COUNT(DISTINCT a.id) AS applies_count, c.name_company " +
                "FROM Recruitment r " +
                "LEFT JOIN applypost a ON r.id = a.recruitment_id " +
                "INNER JOIN Company c ON r.company_id = c.id " +
                "GROUP BY r.id, c.name_company";

        return jdbcTemplate.query(sql, recruitmentWithApplyAndCompanyRowMapper);
    }

    private RowMapper<Recruitment> recruitmentWithApplyAndCompanyRowMapper = new RowMapper<Recruitment>() {
        @Override
        public Recruitment mapRow(ResultSet rs, int rowNum) throws SQLException {
            Recruitment recruitment = new Recruitment();
            recruitment.setId(rs.getInt("id"));
            recruitment.setAddress(rs.getString("address"));
            recruitment.setCreatedAt(rs.getString("created_at"));
            recruitment.setDescription(rs.getString("description"));
            recruitment.setExperience(rs.getString("experience"));
            recruitment.setQuality(rs.getString("quality"));
            recruitment.setRanking(rs.getInt("ranking"));
            recruitment.setSalary(rs.getDouble("salary"));
            recruitment.setStatus(rs.getString("status"));
            recruitment.setTitle(rs.getString("title"));
            recruitment.setType(rs.getString("type"));
            recruitment.setView(rs.getInt("view"));
            recruitment.setCompanyId(rs.getInt("company_id"));
            recruitment.setCategoryId(rs.getInt("category_id"));
            recruitment.setDeadline(rs.getString("deadline"));
            recruitment.setAppliesCount(rs.getInt("applies_count"));
            recruitment.setCompanyName(rs.getString("name_company")); // Assuming you have this setter
            return recruitment;
        }
    };

    public Recruitment findById(int id) {
        String sql = "SELECT * FROM Recruitment WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, recruitmentRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<Recruitment> findByCompanyId(int companyId) {
        String sql = "SELECT * FROM Recruitment WHERE company_id = ?";
        return jdbcTemplate.query(sql, recruitmentRowMapper, companyId);
    }

    public int save(Recruitment recruitment) {
        String sql = "INSERT INTO Recruitment (address, description, experience, quality, salary, title, type, company_id, category_id, deadline) "
                +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                recruitment.getAddress(),
                recruitment.getDescription(),
                recruitment.getExperience(),
                recruitment.getQuality(),
                recruitment.getSalary(),
                recruitment.getTitle(),
                recruitment.getType(),
                recruitment.getCompanyId(),
                recruitment.getCategoryId(),
                recruitment.getDeadline());
    }

    public int updateById(int id, Recruitment recruitment) {
        String sql = "UPDATE Recruitment SET address = ?, description = ?, experience = ?, quality = ?, ranking = ?, salary = ?, title = ?, type = ?, view = ?, category_id = ?, deadline = ? "
                +
                "WHERE id = ?";
        return jdbcTemplate.update(sql,
                recruitment.getAddress(),
                recruitment.getDescription(),
                recruitment.getExperience(),
                recruitment.getQuality(),
                recruitment.getRanking(),
                recruitment.getSalary(),
                recruitment.getTitle(),
                recruitment.getType(),
                recruitment.getView(),
                recruitment.getCategoryId(),
                recruitment.getDeadline(),
                id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM Recruitment WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}

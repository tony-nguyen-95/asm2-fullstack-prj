package com.asm.asm2.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm2.Models.ApplyRecruitment;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ApplyRecruitmentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<ApplyRecruitment> applyRecruitmentRowMapper = new RowMapper<ApplyRecruitment>() {
        @Override
        public ApplyRecruitment mapRow(ResultSet rs, int rowNum) throws SQLException {
            ApplyRecruitment applyRecruitment = new ApplyRecruitment();
            applyRecruitment.setId(rs.getInt("id"));
            applyRecruitment.setCreatedAt(rs.getString("created_at"));
            applyRecruitment.setNameCv(rs.getString("name_cv"));
            applyRecruitment.setStatus(rs.getString("status"));
            applyRecruitment.setText(rs.getString("text"));
            applyRecruitment.setRecruitmentId(rs.getInt("recruitment_id"));
            applyRecruitment.setUserId(rs.getInt("user_id"));
            return applyRecruitment;
        }
    };

    private RowMapper<ApplyRecruitment> applyRecruitmentWithTitleRowMapper = new RowMapper<ApplyRecruitment>() {
        @Override
        public ApplyRecruitment mapRow(ResultSet rs, int rowNum) throws SQLException {
            ApplyRecruitment applyRecruitment = new ApplyRecruitment();
            applyRecruitment.setId(rs.getInt("id"));
            applyRecruitment.setCreatedAt(rs.getString("created_at"));
            applyRecruitment.setNameCv(rs.getString("name_cv"));
            applyRecruitment.setStatus(rs.getString("status"));
            applyRecruitment.setText(rs.getString("text"));
            applyRecruitment.setRecruitmentId(rs.getInt("recruitment_id"));
            applyRecruitment.setUserId(rs.getInt("user_id"));
            applyRecruitment.setTitle(rs.getString("title"));
            applyRecruitment.setType(rs.getString("type"));
            return applyRecruitment;
        }
    };

    public int save(ApplyRecruitment applyRecruitment) {
        String sql = "INSERT INTO applypost (name_cv, text, recruitment_id, user_id) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                applyRecruitment.getNameCv(),
                applyRecruitment.getText(),
                applyRecruitment.getRecruitmentId(),
                applyRecruitment.getUserId());
    }

    public List<ApplyRecruitment> findAll() {
        String sql = "SELECT * FROM applypost";
        return jdbcTemplate.query(sql, applyRecruitmentRowMapper);
    }

    public ApplyRecruitment findById(int id) {
        String sql = "SELECT * FROM applypost WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, applyRecruitmentRowMapper, id);
    }

    public List<ApplyRecruitment> findByRecruitmentId(int recruitmentId) {
        String sql = "SELECT * FROM applypost WHERE recruitment_id = ?";
        return jdbcTemplate.query(sql, applyRecruitmentRowMapper, recruitmentId);
    }

    public ApplyRecruitment checkApplied(int userId, int reId) {
        String sql = "SELECT * FROM applypost WHERE user_id = ? AND recruitment_id = ?";

        List<ApplyRecruitment> result = jdbcTemplate.query(sql, applyRecruitmentRowMapper, userId, reId);
        return result.isEmpty() ? null : result.get(0);
    }

    public int updateStatus(int applyId) {
        String sql = "UPDATE applypost SET status = 'APPROVED' WHERE id = ?";
        return jdbcTemplate.update(sql, applyId);
    }

    public List<ApplyRecruitment> findByUserId(int userId) {
        String sql = "SELECT ap.*, r.title, r.type FROM applypost ap " +
                "JOIN recruitment r ON ap.recruitment_id = r.id " +
                "WHERE ap.user_id = ?";
        return jdbcTemplate.query(sql, applyRecruitmentWithTitleRowMapper, userId);
    }
}

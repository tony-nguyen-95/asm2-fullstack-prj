package com.asm.asm2.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm2.Models.CV;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CVRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<CV> cvRowMapper = new RowMapper<CV>() {
        @Override
        public CV mapRow(ResultSet rs, int rowNum) throws SQLException {
            CV cv = new CV();
            cv.setId(rs.getInt("id"));
            cv.setFileName(rs.getString("file_name"));
            cv.setUserId(rs.getInt("user_id"));
            return cv;
        }
    };

    public List<CV> findAll() {
        String sql = "SELECT * FROM CV";
        return jdbcTemplate.query(sql, cvRowMapper);
    }

    public CV findById(int id) {
        String sql = "SELECT * FROM CV WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, cvRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public CV findByFilename(String filename) {
        String sql = "SELECT * FROM CV WHERE file_name = ?";
        try {
            return jdbcTemplate.queryForObject(sql, cvRowMapper, filename);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public List<CV> findByUserId(int userId) {
        String sql = "SELECT * FROM CV WHERE user_id = ?";
        return jdbcTemplate.query(sql, cvRowMapper, userId);
    }

    public int save(CV cv) {
        String sql = "INSERT INTO CV (file_name, user_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql,
                cv.getFileName(),
                cv.getUserId());
    }

    public int updateById(int id, CV cv) {
        String sql = "UPDATE CV SET file_name = ?, user_id = ? WHERE id = ?";
        return jdbcTemplate.update(sql,
                cv.getFileName(),
                cv.getUserId(),
                id);
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM CV WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}

package com.asm.asm2.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.asm.asm2.Models.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<User> userRowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setPassword(rs.getString("password"));
            user.setFullname(rs.getString("fullname"));
            user.setEmail(rs.getString("email"));
            user.setPhoneNumber(rs.getString("phone_number"));
            user.setRoleId(rs.getInt("role_id"));
            user.setAddress(rs.getString("address"));
            user.setAvatar(rs.getString("avatar"));
            user.setDescription(rs.getString("description"));
            user.setStatus(rs.getString("status"));
            return user;
        }
    };

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM User", userRowMapper);
    }

    public User findById(int id) {
        String sql = "SELECT * FROM User WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, userRowMapper, id);
        } catch (EmptyResultDataAccessException e) {
            return null; // Handle not found case
        }
    }

    public User findByVerifyStatusCode(String code) {
        String sql = "SELECT * FROM User WHERE status = ?";
        try {
            return jdbcTemplate.queryForObject(sql, userRowMapper, code);
        } catch (EmptyResultDataAccessException e) {
            return null; // Handle not found case
        }
    }

    public User updateByStatusByID(int id, User user) {
        String sql = "UPDATE User SET status = 'VERIFIED' WHERE id = ?";
        try {
            jdbcTemplate.update(sql, id);
            return findById(id);
        } catch (Exception e) {
            System.err.println("Error executing update: " + e.getMessage());
            throw e;
        }
    }

    public int save(User user) {
        String sql = "INSERT INTO User (password, fullname, email, role_id, phone_number, address, avatar, description, status) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                user.getPassword(),
                user.getFullname(),
                user.getEmail(),
                user.getRoleId(),
                user.getPhoneNumber(),
                user.getAddress(),
                user.getAvatar(),
                user.getDescription(),
                user.getStatus());
    }

    public User updateById(int id, User user) {
        String sql = "UPDATE User SET fullname = ?, phone_number = ?, address = ?, description = ?, avatar = ? WHERE id = ?";
        try {
            jdbcTemplate.update(sql,
                    user.getFullname(),
                    user.getPhoneNumber(),
                    user.getAddress(),
                    user.getDescription(),
                    user.getAvatar(),
                    id);
            // Fetch and return the updated user
            return findById(id);
        } catch (Exception e) {
            // Log the exception to understand what's happening
            System.err.println("Error executing update: " + e.getMessage());
            throw e;
        }
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM User WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public User login(String email, String password) {
        String sql = "SELECT * FROM User WHERE email = ? AND password = ?";
        try {
            return jdbcTemplate.queryForObject(sql, userRowMapper, email, password);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}

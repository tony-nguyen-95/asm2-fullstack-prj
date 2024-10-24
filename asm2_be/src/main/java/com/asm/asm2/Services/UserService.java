package com.asm.asm2.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asm.asm2.Models.User;
import com.asm.asm2.Repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User getUserByVerifyStatusCode(String code) {
        return userRepository.findByVerifyStatusCode(code);
    }

    public User updateByStatusByID(int id, User user) {
        return userRepository.updateByStatusByID(id, user);
    }

    public User getUserById(int id) {
        return userRepository.findById(id);
    }

    public User login(String email, String password) {
        return userRepository.login(email, password);
    }

    public User updateUser(int id, String fullname, String email, String phoneNumber, String address,
            String description,
            String avatar) {
        User existingUser = userRepository.findById(id);

        if (existingUser != null) {
            existingUser.setFullname(fullname);
            existingUser.setEmail(email);
            existingUser.setPhoneNumber(phoneNumber);
            existingUser.setAddress(address);
            existingUser.setDescription(description);
            existingUser.setAvatar(avatar);

            // Save the updated user back to the database
            return userRepository.updateById(id, existingUser);

        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public int deleteUser(int id) {
        return userRepository.deleteById(id);
    }

}

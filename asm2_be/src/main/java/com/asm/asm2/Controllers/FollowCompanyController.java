package com.asm.asm2.Controllers;

import com.asm.asm2.DTO.FollowCompanyDTO;
import com.asm.asm2.Models.FollowCompany;
import com.asm.asm2.Services.FollowCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow-company")
public class FollowCompanyController {

    @Autowired
    private FollowCompanyService followCompanyService;

    // Get all follow company records
    @GetMapping("/all")
    public ResponseEntity<List<FollowCompany>> getAllFollows() {
        List<FollowCompany> follows = followCompanyService.getAllFollows();
        return new ResponseEntity<>(follows, HttpStatus.OK);
    }

    // Get a follow company record by ID
    @GetMapping("/{id}")
    public ResponseEntity<FollowCompany> getFollowById(@PathVariable int id) {
        FollowCompany follow = followCompanyService.getFollowById(id);
        if (follow != null) {
            return new ResponseEntity<>(follow, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get all follows for a specific company by company ID
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<FollowCompany>> getFollowsByCompanyId(@PathVariable int companyId) {
        List<FollowCompany> follows = followCompanyService.getFollowsByCompanyId(companyId);
        return new ResponseEntity<>(follows, HttpStatus.OK);
    }

    // Get all follows for a specific user by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FollowCompany>> getFollowsByUserId(@PathVariable int userId) {
        List<FollowCompany> follows = followCompanyService.getFollowsByUserId(userId);
        return new ResponseEntity<>(follows, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> followCompany(@RequestBody FollowCompanyDTO followCompanyDTO) {
        try {

            FollowCompany followCompany = new FollowCompany(followCompanyDTO.getCompanyId(),
                    followCompanyDTO.getUserId());

            // Check if the user is already following the company
            if (followCompanyService.isUserFollowingCompany(followCompanyDTO.getUserId(),
                    followCompanyDTO.getCompanyId())) {
                return new ResponseEntity<>("User is already following this company", HttpStatus.CONFLICT);
            }

            followCompanyService.addFollow(followCompany);
            return new ResponseEntity<>("Follow added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding follow", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Remove a follow company record by ID
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeFollow(@PathVariable int id) {
        try {
            followCompanyService.removeFollowById(id);
            return new ResponseEntity<>("Follow removed successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error removing follow", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

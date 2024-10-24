package com.asm.asm2.Controllers;

import com.asm.asm2.DTO.ApplyRecruitmentDTO;
import com.asm.asm2.Models.ApplyRecruitment;
import com.asm.asm2.Services.ApplyRecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apply-recruitment")
public class ApplyRecruitmentController {

    @Autowired
    private ApplyRecruitmentService applyRecruitmentService;

    @GetMapping("/all")
    public ResponseEntity<List<ApplyRecruitment>> getAllApplications() {
        List<ApplyRecruitment> applications = applyRecruitmentService.getAllApplications();
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplyRecruitment>> getApplicationsByUserId(@PathVariable int userId) {
        List<ApplyRecruitment> applications = applyRecruitmentService.getApplicationsByUserId(userId);
        if (applications != null && !applications.isEmpty()) {
            return new ResponseEntity<>(applications, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplyRecruitment> getApplicationById(@PathVariable int id) {
        ApplyRecruitment application = applyRecruitmentService.getApplicationById(id);
        if (application != null) {
            return new ResponseEntity<>(application, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/recruitment/{recruitmentId}")
    public ResponseEntity<List<ApplyRecruitment>> getApplicationsByRecruitmentId(@PathVariable int recruitmentId) {
        List<ApplyRecruitment> applications = applyRecruitmentService.getApplicationsByRecruitmentId(recruitmentId);
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @PostMapping("/apply")
    public ResponseEntity<String> applyForRecruitment(@RequestBody ApplyRecruitmentDTO applyRecruitmentDTO) {
        try {
            ApplyRecruitment applyRecruitment = new ApplyRecruitment(applyRecruitmentDTO.getNameCv(),
                    applyRecruitmentDTO.getText(), applyRecruitmentDTO.getRecruitmentId(),
                    applyRecruitmentDTO.getUserId());

            // // Check if the user has already applied
            if (applyRecruitmentService.isApplied(applyRecruitmentDTO.getUserId(),
                    applyRecruitmentDTO.getRecruitmentId())) {
                return new ResponseEntity<>("You have applied for this job already",
                        HttpStatus.ALREADY_REPORTED);
            }

            applyRecruitmentService.addApplication(applyRecruitment);

            return new ResponseEntity<>("Application submitted successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error submitting application", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/approve/{applyId}")
    public ResponseEntity<Integer> approveApplication(@PathVariable int applyId) {
        int apply = applyRecruitmentService.approveStatusApplication(applyId);
        return new ResponseEntity<>(apply, HttpStatus.OK);
    }

}

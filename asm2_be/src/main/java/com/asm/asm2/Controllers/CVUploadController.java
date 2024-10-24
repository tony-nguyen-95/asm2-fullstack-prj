package com.asm.asm2.Controllers;

import com.asm.asm2.Models.CV;
import com.asm.asm2.Services.CVService;
import com.asm.asm2.Services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/resume")
public class CVUploadController {

    @Autowired
    private CVService cvService;
    private EmailService emailService;

    public CVUploadController(CVService cVService, EmailService emailService) {
        this.cvService = cVService;
        this.emailService = emailService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCV(@RequestParam("userId") int userId, @RequestParam("cv") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\": \"Missing file\"}");
        }

        try {
            String fileName = file.getOriginalFilename();

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String timestamp = LocalDateTime.now().format(formatter);

            // Append the timestamp to the filename
            String uniqueFileName = fileName + "_" + timestamp;

            String uploadPath = System.getProperty("user.dir") + "/uploads";
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdir();
            }

            // Save the file to disk
            File uploadedFile = new File(uploadPath + File.separator + uniqueFileName);
            try (FileOutputStream fos = new FileOutputStream(uploadedFile);
                    InputStream inputStream = file.getInputStream()) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    fos.write(buffer, 0, bytesRead);
                }
            }

            // Save CV information to the database
            CV newCV = new CV(fileName, userId);
            cvService.addCV(newCV);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("{\"message\": \"CV uploaded successfully\", \"fileName\": \"" + fileName + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"Error uploading CV\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCVsByUserId(@PathVariable int userId) {
        try {
            List<CV> listCV = cvService.getCVsByUserId(userId);

            if (!listCV.isEmpty()) {
                return ResponseEntity.ok(listCV);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"CV not found\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\": \"An error occurred\"}");
        }
    }

    @GetMapping("/all") // Ensure there is no duplicate mapping for this method
    public ResponseEntity<?> getAllCVs() {
        try {
            List<CV> allCVs = cvService.getAllCVs();

            if (!allCVs.isEmpty()) {
                return ResponseEntity.ok(allCVs);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"No CVs found\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"error\":\"An error occurred\"}");
        }

    }

    @PutMapping("/updateCV/{filename}")
    public ResponseEntity<String> updateCV(@PathVariable String filename,
            @RequestParam(value = "cv", required = false) MultipartFile file) {
        // Check if the CV exists in the database
        CV existingCV = cvService.getCVByFilename(filename); // Assuming you have a method to fetch the CV by ID
        if (existingCV == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"CV not found\"}");
        }

        try {
            String uniqueFileName = existingCV.getFileName();
            // If a new file is provided, process the upload
            if (file != null && !file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
                String timestamp = LocalDateTime.now().format(formatter);

                uniqueFileName = timestamp + "_" + fileName;

                String uploadPath = System.getProperty("user.dir") + "/uploads";
                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdir();
                }

                // Save the new file to disk
                System.out.println(uniqueFileName);
                File uploadedFile = new File(uploadPath + File.separator + uniqueFileName);
                try (FileOutputStream fos = new FileOutputStream(uploadedFile);
                        InputStream inputStream = file.getInputStream()) {
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        fos.write(buffer, 0, bytesRead);
                    }
                }
            }

            // Update CV information in the database

            existingCV.setFileName(uniqueFileName); // Update the filename
            cvService.updateCV(existingCV.getId(), existingCV); // Assuming you have an update method

            return ResponseEntity.status(HttpStatus.OK)
                    .body("{\"message\": \"CV updated successfully\", \"fileName\": \"" + uniqueFileName + "\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"Error updating CV\", \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}

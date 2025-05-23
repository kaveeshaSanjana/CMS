package edu.icet.controller;

import edu.icet.dto.EnrollmentDTO;
import edu.icet.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cause/enrollment")
@RequiredArgsConstructor
public class EnrollController {
    private final EnrollmentService  enrollmentService;

    @PostMapping
    public ResponseEntity<EnrollmentDTO> enroll(Authentication authentication, @RequestBody EnrollmentDTO enrollmentDTO) {
        return ResponseEntity.ok().body(enrollmentService.create(authentication, enrollmentDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentDTO> getById(Authentication authentication, @PathVariable("id") Long id) {
        return ResponseEntity.ok().body(enrollmentService.getById(authentication, id));
    }

    @GetMapping
    public ResponseEntity<List<EnrollmentDTO>> getAll(Authentication authentication) throws IOException {


        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnrollmentDTO> update(Authentication authentication, @PathVariable("id") Long id, @RequestBody EnrollmentDTO enrollmentDTO) {
        enrollmentDTO.setEnrollId(id);
        return ResponseEntity.ok().body(enrollmentService.update(authentication, enrollmentDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication authentication, @PathVariable("id") Long id) {
        enrollmentService.delete(authentication, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EnrollmentDTO>> getByStudentId(Authentication authentication, @PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok().body(enrollmentService.findByStudentId(authentication, studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<EnrollmentDTO>> getByCourseId(Authentication authentication, @PathVariable("courseId") Long courseId) {
        return ResponseEntity.ok().body(enrollmentService.findByCourseId(authentication, courseId));
    }

}
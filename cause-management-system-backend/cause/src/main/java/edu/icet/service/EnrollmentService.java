package edu.icet.service;

import edu.icet.dto.EnrollmentDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface EnrollmentService {
    EnrollmentDTO create(Authentication authentication, EnrollmentDTO enrollmentDTO);

    EnrollmentDTO getById(Authentication authentication, Long id);

    List<EnrollmentDTO> getAll(Authentication authentication);

    EnrollmentDTO update(Authentication authentication, EnrollmentDTO enrollmentDTO);

    void delete(Authentication authentication, Long id);

    List<EnrollmentDTO> findByStudentId(Authentication authentication, Long studentId);

    List<EnrollmentDTO> findByCourseId(Authentication authentication, Long courseId);
}

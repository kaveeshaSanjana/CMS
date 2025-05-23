package edu.icet.service.impl;

import edu.icet.dto.EnrollmentDTO;
import edu.icet.entity.EnrollCausesEntity;
import edu.icet.service.EnrollmentService;
import edu.icet.repository.EnrollmentDao;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {
    private final ModelMapper mapper;
    private final EnrollmentDao enrollmentDao;

    @Override
    public EnrollmentDTO create(Authentication authentication, EnrollmentDTO enrollmentDTO) {
        // Set the enrollment date to current date if not provided
        if (enrollmentDTO.getEnrollDate() == null) {
            enrollmentDTO.setEnrollDate(LocalDate.now());
        }

        // Set default values if not provided
        if (enrollmentDTO.getCompleteLevel() == null) {
            enrollmentDTO.setCompleteLevel((short) 0);
        }

        if (enrollmentDTO.getIsComplete() == null) {
            enrollmentDTO.setIsComplete(false);
        }

        // Convert DTO to entity
        EnrollCausesEntity enrollEntity = mapper.map(enrollmentDTO, EnrollCausesEntity.class);

        // Save entity
        EnrollCausesEntity savedEntity = enrollmentDao.save(enrollEntity);

        // Convert saved entity back to DTO
        return mapper.map(savedEntity, EnrollmentDTO.class);
    }

    @Override
    public EnrollmentDTO getById(Authentication authentication, Long id) {
        Optional<EnrollCausesEntity> enrollmentOpt = enrollmentDao.findById(id);

        if (enrollmentOpt.isEmpty()) {
            throw new IllegalArgumentException("Enrollment not found with ID: " + id);
        }

        return mapper.map(enrollmentOpt.get(), EnrollmentDTO.class);
    }

    @Override
    public List<EnrollmentDTO> getAll(Authentication authentication) {
        List<EnrollCausesEntity> enrollments = enrollmentDao.findAll();

        return enrollments.stream()
                .map(enrollment -> mapper.map(enrollment, EnrollmentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public EnrollmentDTO update(Authentication authentication, EnrollmentDTO enrollmentDTO) {
        // Check if the enrollment exists
        if (!enrollmentDao.existsById(enrollmentDTO.getEnrollId())) {
            throw new IllegalArgumentException("Enrollment not found with ID: " + enrollmentDTO.getEnrollId());
        }

        // Convert DTO to entity
        EnrollCausesEntity enrollEntity = mapper.map(enrollmentDTO, EnrollCausesEntity.class);

        // Save updated entity
        EnrollCausesEntity updatedEntity = enrollmentDao.save(enrollEntity);

        // Convert updated entity back to DTO
        return mapper.map(updatedEntity, EnrollmentDTO.class);
    }

    @Override
    public void delete(Authentication authentication, Long id) {
        if (!enrollmentDao.existsById(id)) {
            throw new IllegalArgumentException("Enrollment not found with ID: " + id);
        }

        enrollmentDao.deleteById(id);
    }

    @Override
    public List<EnrollmentDTO> findByStudentId(Authentication authentication, Long studentId) {
        List<EnrollCausesEntity> enrollments = enrollmentDao.findByUserId(studentId);

        return enrollments.stream()
                .map(enrollment -> mapper.map(enrollment, EnrollmentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<EnrollmentDTO> findByCourseId(Authentication authentication, Long courseId) {
        List<EnrollCausesEntity> enrollments = enrollmentDao.findByCauseId(courseId);

        return enrollments.stream()
                .map(enrollment -> mapper.map(enrollment, EnrollmentDTO.class))
                .collect(Collectors.toList());
    }
}
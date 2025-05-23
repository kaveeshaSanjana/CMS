package edu.icet.repository;

import edu.icet.entity.EnrollCausesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentDao extends JpaRepository<EnrollCausesEntity , Long> {
    List<EnrollCausesEntity> findByUserId(Long studentId);
    List<EnrollCausesEntity> findByCauseId(Long courseId);
}

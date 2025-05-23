package edu.icet.repository;

import edu.icet.dto.CauseDTO;
import edu.icet.entity.CauseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CauseDao extends JpaRepository<CauseEntity,Long> {
    @Query(value = "SELECT * FROM cause ORDER BY id DESC LIMIT ?1", nativeQuery = true)
    List<CauseEntity> findTopCauses(Integer count);

}

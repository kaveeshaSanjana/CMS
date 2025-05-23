package edu.icet.repository;

import edu.icet.dto.VideoDTO;
import edu.icet.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoDao extends JpaRepository<VideoEntity,Long> {
    List<VideoEntity> findAllByCauseId(Long causeId);
}

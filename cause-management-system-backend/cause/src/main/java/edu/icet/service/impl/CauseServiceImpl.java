package edu.icet.service.impl;

import edu.icet.dto.CauseDTO;
import edu.icet.entity.CauseEntity;
import edu.icet.repository.CauseDao;
import edu.icet.service.CauseService;
import edu.icet.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CauseServiceImpl implements CauseService {
    private final ModelMapper mapper;
    private final CauseDao causeDao;
    private final VideoService videoService;

    @Override
    public List<CauseDTO> getCauses(Authentication authentication, Integer count) {
        List<CauseEntity> causes;
        if (count != null && count > 0) {

            causes = causeDao.findTopCauses(count);
        } else {
            causes = causeDao.findAll();
        }

        return causes.stream()
                .map(cause -> {
                    CauseDTO map = mapper.map(cause, CauseDTO.class);
                    map.setVideos(videoService.getCauseVideos(cause.getId()));
                    return map;
                })
                .toList();
    }

    @Override
    public CauseDTO createCause(Authentication authentication, CauseDTO causeDTO) {
        CauseEntity savedCause = causeDao.save(mapper.map(causeDTO, CauseEntity.class));

        return mapper.map(savedCause, CauseDTO.class);
    }

    @Override
    public CauseDTO update(Authentication authentication, CauseDTO causeDTO) {
        Optional<CauseEntity> existingCauseOpt = causeDao.findById(causeDTO.getId());

        if (existingCauseOpt.isEmpty()) {
            throw new IllegalArgumentException("Cause not found with ID: " + causeDTO.getId());
        }

        CauseEntity existingCause = existingCauseOpt.get();

        mapper.map(causeDTO, existingCause);

        CauseEntity updatedCause = causeDao.save(existingCause);

        return mapper.map(updatedCause, CauseDTO.class);
    }

    @Override
    public Boolean hardDelete(Authentication authentication, Long id) {
        Optional<CauseEntity> causeOpt = causeDao.findById(id);

        if (causeOpt.isEmpty()) {
            return false;
        }

        try {
            causeDao.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean softDelete(Authentication authentication, Long id) {
        Optional<CauseEntity> causeOpt = causeDao.findById(id);

        if (causeOpt.isEmpty()) {
            return false;
        }

        try {
            CauseEntity cause = causeOpt.get();
            cause.setIsEnable(false);
            causeDao.save(cause);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public CauseDTO getCauseDetails(Authentication authentication, Long id) {
        return mapper.map(causeDao.findById(id),CauseDTO.class);
    }
}
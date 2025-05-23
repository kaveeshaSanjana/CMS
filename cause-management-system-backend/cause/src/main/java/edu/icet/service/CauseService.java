package edu.icet.service;

import edu.icet.dto.CauseDTO;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CauseService {
    List<CauseDTO> getCauses(Authentication authentication, Integer count);

    CauseDTO createCause(Authentication authentication, CauseDTO causeDTO);

    CauseDTO update(Authentication authentication, CauseDTO causeDTO);

    Boolean hardDelete(Authentication authentication, Long id);

    Boolean softDelete(Authentication authentication, Long id);

    CauseDTO getCauseDetails(Authentication authentication, Long id);
}

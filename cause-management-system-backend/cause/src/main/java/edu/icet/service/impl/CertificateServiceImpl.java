package edu.icet.service.impl;

import edu.icet.dto.CertificateDTO;
import edu.icet.service.CertificateService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateServiceImpl implements CertificateService {
    @Override
    public CertificateDTO getById(Authentication authentication, Long id) {
        return null;
    }

    @Override
    public String checkValid(Long id) {
        return "";
    }

    @Override
    public CertificateDTO create(Authentication authentication, CertificateDTO certificateDTO) {
        return null;
    }

    @Override
    public List<CertificateDTO> getAll(Authentication authentication) {
        return List.of();
    }
}

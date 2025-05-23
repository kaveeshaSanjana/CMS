package edu.icet.service;

import edu.icet.dto.CertificateDTO;
import org.apache.tomcat.jni.Library;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CertificateService {
    CertificateDTO getById(Authentication authentication, Long id);

    String checkValid(Long id);

    CertificateDTO create(Authentication authentication, CertificateDTO certificateDTO);

    List<CertificateDTO> getAll(Authentication authentication);
}

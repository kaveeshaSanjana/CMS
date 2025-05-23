package edu.icet.service;

import edu.icet.dto.CauseCertificateDTO;
import edu.icet.dto.EnrollmentDTO;

import java.io.IOException;

public interface CauseCertificateService {
    void saveCertificate(EnrollmentDTO enrollmentDTO) throws IOException;
}

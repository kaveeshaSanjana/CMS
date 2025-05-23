package edu.icet.service.impl;

import edu.icet.dto.EnrollmentDTO;
import edu.icet.entity.CauseCertificateEntity;
import edu.icet.repository.CauseCertificateDao;
import edu.icet.service.CauseCertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CauseCertificateServiceImpl implements CauseCertificateService {

    @Override
    public void saveCertificate(EnrollmentDTO enrollmentDTO) throws IOException {
        File file = new File("D:/Projects - Kaveesha Sanjana/CMS-Cause/src/main/java/edu/icet/images/ts.jpg");
        BufferedImage image = ImageIO.read(file);
        Graphics2D g2d = image.createGraphics();

        g2d.setFont(new Font("Arial", Font.BOLD, 28));
        g2d.setColor(Color.BLACK);
        g2d.drawString("John Doe", 200, 340); // Name position
        g2d.drawString("April 13, 2025", 200, 400); // Date position
        g2d.dispose();
        ImageIO.write(image, "png", new File("certificate_generated.png"));
    }
}

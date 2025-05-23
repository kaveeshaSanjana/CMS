package edu.icet.dto;

import edu.icet.entity.CertificateComponentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CauseCertificateDTO {

    private Long id;

    private String baseImgUrl;
    private List<CertificateComponentEntity> components;
}

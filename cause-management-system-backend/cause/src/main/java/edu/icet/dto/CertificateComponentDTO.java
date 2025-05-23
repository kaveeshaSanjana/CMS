package edu.icet.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CertificateComponentDTO {
    private Long certificateId;
    private String name;
    private Integer x;
    private Integer y;
}

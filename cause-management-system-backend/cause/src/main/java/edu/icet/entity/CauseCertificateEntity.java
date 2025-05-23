package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "cause_certificate")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CauseCertificateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long causeId;
    private String baseImgUrl;
    @OneToMany
    private List<CertificateComponentEntity> components;
}

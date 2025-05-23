package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "certificate_position")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CertificateComponentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long causeId;
    private String name;
    private Integer x;
    private Integer y;
}

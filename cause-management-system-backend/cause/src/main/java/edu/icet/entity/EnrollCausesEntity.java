package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_enroll")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollCausesEntity {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long enrollId;

    private Long userId;
    private Long causeId;
    private LocalDate enrollDate;
    private Short completeLevel;
    private Boolean isComplete;
}

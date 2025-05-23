package edu.icet.dto;

import edu.icet.entity.CauseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDTO {
    private Long enrollId;
    private Long userId;
    private CauseEntity cause;
    private LocalDate enrollDate;
    private Short completeLevel;
    private Boolean isComplete;
}

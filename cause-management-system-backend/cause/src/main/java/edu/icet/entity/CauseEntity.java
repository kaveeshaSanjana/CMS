package edu.icet.entity;

import edu.icet.enums.VideoVisibility;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Cause")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CauseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String thumbnailUrl;
    private Long ownerId;
    private Short review;
    private VideoVisibility videoVisibility;
    private Boolean isEnable;
}

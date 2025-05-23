package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CauseDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String thumbnailUrl;
    private Long ownerId;
    private Short review;
    private List<VideoDTO> videos;
    private Boolean isEnable;
}

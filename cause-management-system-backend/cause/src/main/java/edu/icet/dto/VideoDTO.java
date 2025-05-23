package edu.icet.dto;

import edu.icet.enums.VideoVisibility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDTO {
    private Long videoId;
    private Long causeId;
    private String url;
    private String title;
    private String description;
    private Short position;
    private Boolean isEnable;
    private VideoVisibility videoVisibility;
    private String location;
}

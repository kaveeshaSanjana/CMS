package edu.icet.service;

import edu.icet.dto.VideoDTO;

import java.util.List;

public interface VideoService {
    VideoDTO create(VideoDTO videoDTO);

    List<VideoDTO> getCauseVideos(Long causeId);
}

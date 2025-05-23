package edu.icet.service.impl;

import edu.icet.dto.VideoDTO;
import edu.icet.entity.VideoEntity;
import edu.icet.repository.VideoDao;
import edu.icet.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoDao videoDao;
    private final ModelMapper mapper;

    @Override
    public VideoDTO create(VideoDTO videoDTO) {
        return mapper.map(videoDao.save(mapper.map(videoDTO, VideoEntity.class)),VideoDTO.class);
    }

    @Override
    public List<VideoDTO> getCauseVideos(Long causeId) {
        return videoDao.findAllByCauseId(causeId).stream().map(video -> mapper.map(video,VideoDTO.class) ).toList();
    }
}

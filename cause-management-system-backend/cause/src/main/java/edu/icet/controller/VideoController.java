package edu.icet.controller;

import edu.icet.dto.VideoDTO;
import edu.icet.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cause/video")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping
    ResponseEntity<VideoDTO> create(@RequestBody VideoDTO videoDTO){
        try {
            return ResponseEntity.ok().body(videoService.create(videoDTO));
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{cause-id}")
    ResponseEntity<List<VideoDTO>> getCauseVideos(@PathVariable("cause-id")String causeId){
        try {
            return ResponseEntity.ok().body(videoService.getCauseVideos(Long.parseLong(causeId)));
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}

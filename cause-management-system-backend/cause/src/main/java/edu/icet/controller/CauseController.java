package edu.icet.controller;

import edu.icet.dto.CauseDTO;
import edu.icet.service.CauseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cause")
@RequiredArgsConstructor
public class CauseController {

    private final CauseService causeService;

    @GetMapping
    public ResponseEntity<String> cheack(){
        return ResponseEntity.ok().body("test");
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<CauseDTO> getAllCauses(Authentication authentication,@PathVariable("id") Long id){
        return ResponseEntity.ok().body(causeService.getCauseDetails(authentication,id));
    }


    @GetMapping("/{count}")
    public ResponseEntity<List<CauseDTO>> getCauses(Authentication authentication,@PathVariable("count")Integer count){
        return ResponseEntity.ok().body(causeService.getCauses(authentication,count));
    }

    @GetMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<CauseDTO> createCause(Authentication authentication,@RequestBody CauseDTO causeDTO){
        return ResponseEntity.ok().body(causeService.createCause(authentication,causeDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<Boolean> softDelete(Authentication authentication, @PathVariable("id")Long id){
        return ResponseEntity.ok().body(causeService.softDelete(authentication,id));
    }

    @PutMapping()
    public ResponseEntity<CauseDTO> updateCause(Authentication authentication, @RequestBody CauseDTO causeDTO){
        return  ResponseEntity.ok().body(causeService.update(authentication,causeDTO));
    }

    @DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Boolean> hardDelete(Authentication authentication , @PathVariable("id")Long id){
        return  ResponseEntity.ok().body(causeService.hardDelete(authentication,id));
    }
}

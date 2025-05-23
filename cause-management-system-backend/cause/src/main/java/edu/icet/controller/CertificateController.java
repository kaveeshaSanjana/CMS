package edu.icet.controller;

import edu.icet.dto.CertificateDTO;
import edu.icet.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cause/certificate")
@RequiredArgsConstructor
public class CertificateController {
    private CertificateService certificateService;

    @GetMapping("/check/{id}")
    public ResponseEntity<String> checkValid(@PathVariable("id")Long id){
        return ResponseEntity.ok().body(certificateService.checkValid(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateDTO> getById(Authentication authentication,@PathVariable("id")Long id){
        return ResponseEntity.ok().body(certificateService.getById(authentication,id));
    }
    @PostMapping
    public ResponseEntity<CertificateDTO> create(Authentication authentication, @RequestBody CertificateDTO certificateDTO) {
        return ResponseEntity.ok().body(certificateService.create(authentication, certificateDTO));
    }

    @GetMapping
    public ResponseEntity<List<CertificateDTO>> getAll(Authentication authentication) {
        return ResponseEntity.ok().body(certificateService.getAll(authentication));
    }

}

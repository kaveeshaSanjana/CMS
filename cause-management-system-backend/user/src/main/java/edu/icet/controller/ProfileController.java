package edu.icet.controller;

import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.UserResponseDTO;
import edu.icet.enums.UserRole;
import edu.icet.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/profile")
@CrossOrigin
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/admin/{id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable("id") Long id) {
        UserResponseDTO user = profileService.getById(id);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<UserResponseDTO> updateProfile(
            @PathVariable("id") Long id,
            @RequestBody UserRequestDTO updateRequest
    ) {
        UserResponseDTO updatedUser = profileService.updateProfile(id, updateRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable("id") Long id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}

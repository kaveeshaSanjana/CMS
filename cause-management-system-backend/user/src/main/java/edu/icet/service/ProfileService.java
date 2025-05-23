package edu.icet.service;

import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.UserResponseDTO;

import java.util.List;

public interface ProfileService {
    List<UserResponseDTO> getAll();

    UserResponseDTO updateProfile(Long id, UserRequestDTO updateRequest);

    void deleteProfile(Long id);

    UserResponseDTO getById(Long id);
}

package edu.icet.service.impl;

import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.UserResponseDTO;
import edu.icet.service.ProfileService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProfileServiceImpl implements ProfileService {
    @Override
    public List<UserResponseDTO> getAll() {
        return List.of();
    }

    @Override
    public UserResponseDTO updateProfile(Long id, UserRequestDTO updateRequest) {
        return null;
    }

    @Override
    public void deleteProfile(Long id) {

    }

    @Override
    public UserResponseDTO getById(Long id) {
        return null;
    }
}

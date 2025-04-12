package edu.icet.service.impl;

import edu.icet.dto.request.ChangePasswordRequestDTO;
import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.request.UserUpdateDTO;
import edu.icet.dto.response.UserResponseDTO;
import edu.icet.enums.UserRole;
import edu.icet.service.UserService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserResponseDTO createUser(UserRequestDTO request) {
        return null;
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return List.of();
    }

    @Override
    public UserResponseDTO getMyProfile(Authentication authentication) {
        return null;
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        return null;
    }

    @Override
    public UserResponseDTO updateUserById(Long id, UserUpdateDTO request) {
        return null;
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public List<UserResponseDTO> getUsersByRole(UserRole role) {
        return List.of();
    }

    @Override
    public void uploadProfilePicture(Authentication authentication, MultipartFile file) {

    }

    @Override
    public void disableAccount(Authentication authentication) {

    }

    @Override
    public void changePassword(Authentication authentication, ChangePasswordRequestDTO request) {

    }

    @Override
    public UserResponseDTO updateMyProfile(Authentication authentication, UserUpdateDTO request) {
        return null;
    }
}

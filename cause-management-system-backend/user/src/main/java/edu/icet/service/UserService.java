package edu.icet.service;

import edu.icet.dto.request.ChangePasswordRequestDTO;
import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.request.UserUpdateDTO;
import edu.icet.dto.response.UserResponseDTO;
import edu.icet.enums.UserRole;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserResponseDTO createUser(UserRequestDTO request);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO getMyProfile(Authentication authentication);

    UserResponseDTO getUserById(Long id);

    UserResponseDTO updateUserById(Long id, UserUpdateDTO request);

    void deleteUser(Long id);

    List<UserResponseDTO> getUsersByRole(UserRole role);

    void uploadProfilePicture(Authentication authentication, MultipartFile file);

    void disableAccount(Authentication authentication);

    void changePassword(Authentication authentication, ChangePasswordRequestDTO request);

    UserResponseDTO updateMyProfile(Authentication authentication, UserUpdateDTO request);
}

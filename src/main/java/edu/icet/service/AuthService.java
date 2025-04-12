package edu.icet.service;

import edu.icet.dto.request.LoginRequestDTO;
import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.LoginResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    LoginResponseDTO login(HttpServletRequest httpServletRequest, LoginRequestDTO request);

    LoginResponseDTO register(HttpServletRequest httpServletRequest,UserRequestDTO registerRequestDTO);
}
package edu.icet.service.impl;

import edu.icet.dto.request.LoginRequestDTO;
import edu.icet.dto.response.LoginResponseDTO;
import edu.icet.entity.UserEntity;
import edu.icet.repository.UserDao;
import edu.icet.service.AuthService;
import edu.icet.service.security.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserDao userDao;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public LoginResponseDTO login(HttpServletRequest httpServletRequest, @NonNull LoginRequestDTO loginRequestDTO) {
        UserEntity user = userDao.findUserByEmail(loginRequestDTO.getEmail());
        System.out.println("e2");
        if(user != null){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword()));
            Map<String, Object> claims = new HashMap<>();
            claims.put("role",user.getRole());
            claims.put("ip",httpServletRequest.getRemoteAddr());
            claims.put("id",user.getUserID());
            
            String token = jwtService.getToken(user.getEmail(), claims);
            return new LoginResponseDTO("Login Success",token);
        }
        return new LoginResponseDTO("Login Failed",null);
    }
}

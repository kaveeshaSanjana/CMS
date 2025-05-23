package edu.icet.service.impl;

import edu.icet.dto.request.LoginRequestDTO;
import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.LoginResponseDTO;
import edu.icet.entity.UserEntity;
import edu.icet.repository.UserDao;
import edu.icet.service.AuthService;
import edu.icet.service.security.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
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
    private final ModelMapper modelMapper;

    @Override
    public LoginResponseDTO login(HttpServletRequest httpServletRequest, @NonNull LoginRequestDTO loginRequestDTO) {
        UserEntity user = userDao.findUserByEmail(loginRequestDTO.getUsername());
        System.out.println("e2");
        if(user != null){
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword()));

            String token = jwtService.getToken(user.getEmail(), addClaims(user,httpServletRequest));
            return new LoginResponseDTO("Login Success",token);
        }
        return new LoginResponseDTO("Login Failed",null);
    }

    @Override
    public LoginResponseDTO register(HttpServletRequest httpServletRequest,UserRequestDTO userRequestDTO) {
        System.out.println(userRequestDTO);
        UserEntity user = userDao.save(modelMapper.map(userRequestDTO, UserEntity.class));
        System.out.println("User Entity "+user);
        String token = jwtService.getToken(userRequestDTO.getEmail(), addClaims(user, httpServletRequest));

        return new LoginResponseDTO("Register Success",token);
    }

    private Map<String,Object> addClaims(UserEntity user ,HttpServletRequest httpServletRequest){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",user.getRole());
        claims.put("ip",httpServletRequest.getRemoteAddr());
        claims.put("id",user.getUserID());
        return claims;
    }
}


package edu.icet.controller;

import edu.icet.dto.request.LoginRequestDTO;
import edu.icet.dto.response.LoginResponseDTO;
import edu.icet.service.AuthService;
import edu.icet.service.security.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(HttpServletRequest httpServletRequest, @RequestBody LoginRequestDTO request){
        //still make register function
        System.out.println(passwordEncoder.encode(request.getPassword()));

        if(request.getEmail()==null ||request.getPassword()==null
                || request.getPassword().isEmpty() || request.getEmail().isEmpty())
        {
            return ResponseEntity.badRequest().body(
                    new LoginResponseDTO("Failure", "Invalid Request Data")
            );
        }
        return ResponseEntity.ok().body(authService.login(httpServletRequest,request));
    }

    @PostMapping("/register")
    public String getname(){
        SecurityContextHolder.getContext().getAuthentication();
        return SecurityContextHolder.getContext().getAuthentication()+"";
    }
}

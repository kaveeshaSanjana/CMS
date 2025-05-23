package edu.icet.controller;

import edu.icet.dto.request.KeycloakUserDTO;
import edu.icet.dto.request.LoginRequestDTO;
import edu.icet.dto.request.UserRequestDTO;
import edu.icet.dto.response.LoginResponseDTO;
import edu.icet.service.AuthService;
import edu.icet.service.security.JWTService;
import edu.icet.service.security.KeycloakUserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final KeycloakUserService keycloakUserService;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequest) {

        try {
            // Get the token from Keycloak
                String token = keycloakUserService.login(loginRequest.getUsername(), loginRequest.getPassword());

            // Return the token to the client
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(loginRequest.toString()+e+"");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody KeycloakUserDTO request) {
        keycloakUserService.registerUser(request);
        return ResponseEntity.ok("User registered successfully");
    }


    @GetMapping()
    public ResponseEntity<String> get(){
        return ResponseEntity.ok().body("hii");
    }


}

package edu.icet.service.security;

import edu.icet.entity.UserEntity;
import edu.icet.enums.UserRole;
import edu.icet.repository.UserDao;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final UserDao userDao;
    private final JWTService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User auth2User = (OAuth2User) authentication.getPrincipal();
        String email = auth2User.getAttribute("email");

        if (userDao.findUserByEmail(email) == null) {
            UserEntity user = new UserEntity();
            user.setEmail(email);
            user.setIsActive(true);
            user.setRole(UserRole.ADMIN); // You might want to set DEFAULT role instead of always ADMIN later
            user.setUsername(auth2User.getAttribute("name"));
            userDao.save(user);
        }

        UserEntity userEntity = userDao.findUserByEmail(email);

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userEntity.getUserID());
        claims.put("role", userEntity.getRole());
        claims.put("ip", request.getRemoteAddr());

        String token = jwtService.getToken(email, claims);

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write("{\"token\": \"" + token + "\"}");
    }
}

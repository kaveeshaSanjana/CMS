package edu.icet.service.security;

import edu.icet.dto.request.KeycloakUserDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KeycloakUserService {

    private final RestTemplate restTemplate = new RestTemplate();
    private String adminUsername = "kaveesha";
    private String adminPassword = "12345";
    private String keycloakServerUrl = "http://localhost:8080";
    private String realm = "cms-realm";
    private String clientId = "admin-cli";
    private String clientId2 = "cmsClient";
    private String clientSecret = "lYRj2DW6pVAwbffyZywwVraykxcdwRbn";

    public void registerUser(KeycloakUserDTO request) {
        String token = getAdminToken();

        // Step 1: Create user
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> user = new HashMap<>();
        user.put("username", request.getUsername());
        user.put("enabled", true);
        user.put("email", request.getEmail());
        user.put("firstName", request.getFirstName());
        user.put("lastName", request.getLastName());

        user.put("credentials", List.of(Map.of(
                "type", "password",
                "value", request.getPassword(),
                "temporary", false
        )));

        HttpEntity<Map<String, Object>> createUserReq = new HttpEntity<>(user, headers);
        ResponseEntity<Void> createUserRes = restTemplate.postForEntity(
                keycloakServerUrl + "/admin/realms/" + realm + "/users",
                createUserReq, Void.class
        );

        if (createUserRes.getStatusCode().is2xxSuccessful()) {
            // Step 2: Get user ID by username
            String searchUrl = keycloakServerUrl + "/admin/realms/" + realm + "/users?username=" + request.getUsername();
            HttpEntity<Void> searchReq = new HttpEntity<>(headers);
            ResponseEntity<UserResponse[]> searchRes = restTemplate.exchange(
                    searchUrl, HttpMethod.GET, searchReq, UserResponse[].class
            );

            String userId = searchRes.getBody()[0].getId();

            // Step 3: Get role from Keycloak
            String roleUrl = keycloakServerUrl + "/admin/realms/" + realm + "/roles/" + request.getRole();
            ResponseEntity<RoleResponse> roleRes = restTemplate.exchange(
                    roleUrl, HttpMethod.GET, new HttpEntity<>(headers), RoleResponse.class
            );

            RoleResponse role = roleRes.getBody();

            // Step 4: Assign role to user
            String assignUrl = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/realm";
            HttpEntity<List<RoleResponse>> roleAssignReq = new HttpEntity<>(List.of(role), headers);
            restTemplate.postForEntity(assignUrl, roleAssignReq, Void.class);
        }
    }

    private String getAdminToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", clientId);
        form.add("username", adminUsername);
        form.add("password", adminPassword);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                keycloakServerUrl + "/realms/master/protocol/openid-connect/token",
                request, Map.class
        );

        return response.getBody().get("access_token").toString();
    }

    @Data
    static class UserResponse {
        private String id;
        private String username;
    }

    @Data
    static class RoleResponse {
        private String id;
        private String name;
    }
    public String login(String username, String password) {
        String tokenUrl = UriComponentsBuilder.fromHttpUrl(keycloakServerUrl)
                .pathSegment("realms", realm, "protocol", "openid-connect", "token")
                .toUriString();

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId2);
        body.add("client_secret", clientSecret);
        body.add("username", username);
        body.add("password", password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody(); // returns full JSON response with access_token, etc.
        } else {
            throw new RuntimeException("Error occurred while logging in to Keycloak");
        }
    }

}

package edu.icet.dto.request;

import edu.icet.enums.UserRole;
import lombok.Data;

@Data
public class KeycloakUserDTO {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;

}

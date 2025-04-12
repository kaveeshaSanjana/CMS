package edu.icet.dto.request;

import edu.icet.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {
    private Long userID;
    private String profileImage;
    private String username;
    private String password;
    private String email;
    private UserRole role;
}

package edu.icet.dto.response;

import edu.icet.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long userID;
    private String username;
    private String email;
    private UserRole role;
}

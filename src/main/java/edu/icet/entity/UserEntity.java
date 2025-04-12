package edu.icet.entity;

import edu.icet.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;
    private String profileImage;
    private String name;
    private String username;
    private String password;
    private String email;
    private UserRole role;
    private Boolean isActive;
}

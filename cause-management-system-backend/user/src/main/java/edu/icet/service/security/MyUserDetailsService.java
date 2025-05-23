package edu.icet.service.security;

import edu.icet.entity.UserEntity;
import edu.icet.repository.UserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userDao.findUserByEmail(email);
        if(user==null)return null;
        return  User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .build();
    }
}

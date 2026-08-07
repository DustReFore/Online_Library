package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Role;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(
            String fullName,
            String email,
            String password
    ) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "User with this email already exists"
            );
        }

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.USER);
        user.setActive(true);

        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Incorrect email or password"
                ));

        if (!user.isActive()) {
            throw new IllegalStateException("User account is not active");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException(
                    "Incorrect email or password"
            );
        }

        return user;
    }
}
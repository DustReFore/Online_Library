package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthentificationServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    AuthenticationService authenticationService;

    @Test
    void shouldRegisterUser() {
        when(userRepository.existsByEmail("user@gmail.com")).thenReturn(false);
        when(passwordEncoder.encode("Password_1")).thenReturn("encoded");
        when(userRepository.save(any(User.class)))
                .thenAnswer(result -> result.getArgument(0));

        User user = authenticationService.register(
             "Bob Bobovic",
                "user@gmail.com",
                "Password_1"
        );

        assertEquals("user@gmail.com", user.getEmail());
        assertEquals("encoded", user.getPassword());
        assertTrue(user.isActive());
    }

    @Test
    void shouldRejectExistingEmail() {
        when(userRepository.existsByEmail("user@gmail.com")).thenReturn(true);
        assertThrows(IllegalArgumentException.class,
                () -> authenticationService.register(
                        "Bob Bobovic",
                        "user@gmail.com",
                        "Password_1"
                )
        );

        verify(userRepository, never()).save(any());
    }
}

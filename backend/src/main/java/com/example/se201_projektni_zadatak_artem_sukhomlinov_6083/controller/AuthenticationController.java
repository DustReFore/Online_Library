package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Role;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(
            AuthenticationService authenticationService
    ) {
        this.authenticationService = authenticationService;
    }

    public record RegisterRequest(
            String fullName,
            String email,
            String password
    ) {
    }

    public record LoginRequest(
            String email,
            String password
    ) {
    }

    public record AuthResponse(
            Long id,
            String fullName,
            String email,
            Role role
    ) {
        public static AuthResponse fromUser(User user) {
            return new AuthResponse(
                    user.getId(),
                    user.getFullName(),
                    user.getEmail(),
                    user.getRole()
            );
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(
            @RequestBody RegisterRequest request
    ) {
        validateRegistration(request);

        try {
            User user = authenticationService.register(
                    request.fullName(),
                    request.email(),
                    request.password()
            );

            return AuthResponse.fromUser(user);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    exception.getMessage()
            );
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        if (request.email() == null || request.email().isBlank()
                || request.password() == null
                || request.password().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email and password are required"
            );
        }

        try {
            User user = authenticationService.authenticate(
                    request.email(),
                    request.password()
            );

            return AuthResponse.fromUser(user);
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    exception.getMessage()
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    exception.getMessage()
            );
        }
    }

    private void validateRegistration(RegisterRequest request) {
        if (request.fullName() == null
                || request.fullName().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Full name is required"
            );
        }

        if (request.email() == null
                || !request.email().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
        )) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid email address"
            );
        }

        if (request.password() == null
                || request.password().length() < 6) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password must contain at least 6 characters"
            );
        }
    }
}
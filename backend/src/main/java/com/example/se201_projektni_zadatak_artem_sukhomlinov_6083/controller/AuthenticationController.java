package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Role;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

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

            @NotBlank(message = "Full name is required")
            @Size(min = 2, max = 100)
            String fullName,

            @NotBlank(message = "Email is required")
            @Email(message = "Invalid email address")
            String email,

            @NotBlank(message = "Password is required")
            @Pattern(
                    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,64}$",
                    message = "Password must contain uppercase, lowercase, number and special character"
            )
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
            @Valid @RequestBody RegisterRequest request
    ) {
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
            HttpStatus status =
                    "Account is temporarily locked".equals(exception.getMessage())
                            ? HttpStatus.LOCKED
                            : HttpStatus.FORBIDDEN;

            throw new ResponseStatusException(
                    status,
                    exception.getMessage()
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    exception.getMessage()
            );
        }
    }
}
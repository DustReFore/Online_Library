package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Role;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User with id " + id + " was not found"
                ));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User with email " + email + " was not found"
                ));
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException(
                    "User with this email already exists"
            );
        }

        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        user.setActive(true);

        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());
        user.setActive(updatedUser.isActive());

        if (updatedUser.getPassword() != null
                && !updatedUser.getPassword().isBlank()) {
            user.setPassword(updatedUser.getPassword());
        }

        return userRepository.save(user);
    }

    public User changeUserStatus(Long id, boolean active) {
        User user = getUserById(id);
        user.setActive(active);

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
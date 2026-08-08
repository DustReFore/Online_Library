package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Role;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Se201ProjektniZadatakArtemSukhomlinov6083Application {

    public static void main(String[] args) {
        SpringApplication.run(
                Se201ProjektniZadatakArtemSukhomlinov6083Application.class,
                args
        );
    }

    @Bean
    public CommandLineRunner createAdministrator(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.admin.full-name}") String fullName,
            @Value("${app.admin.email}") String email,
            @Value("${app.admin.password}") String password
    ) {
        return args -> {
            if (!userRepository.existsByEmail(email)) {
                User administrator = new User();

                administrator.setFullName(fullName);
                administrator.setEmail(email);
                administrator.setPassword(
                        passwordEncoder.encode(password)
                );
                administrator.setRole(Role.ADMIN);
                administrator.setActive(true);

                userRepository.save(administrator);

                System.out.println(
                        "Administrator account was created: " + email
                );
            }
        };
    }
}
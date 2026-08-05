package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,Long> {
    List<Author> findByLastNameContainingIgnoreCase(String lastName);
}

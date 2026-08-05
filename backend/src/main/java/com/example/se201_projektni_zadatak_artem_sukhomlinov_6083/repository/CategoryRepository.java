package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByNameIgnoreCase(String categoryName);
}

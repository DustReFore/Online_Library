package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorLastNameContainingIgnoreCase(String lastName);
    List<Book> findByCategoryNameIgnoreCase(String categoryName);
    List<Book> findByAvailableTrue();
}

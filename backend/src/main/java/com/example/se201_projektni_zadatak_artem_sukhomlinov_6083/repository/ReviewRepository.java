package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByBookId(Long bookId);
    List<Review> findByUserId(Long userId);
}

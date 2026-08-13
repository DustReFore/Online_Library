package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Review;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.ReviewRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            BookRepository bookRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<Review> getReviewsByBook(Long bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new IllegalArgumentException(
                    "Book was not found"
            );
        }

        return reviewRepository
                .findByBookIdOrderByReviewDateDescIdDesc(
                        bookId
                );
    }

    public Review createReview(
            Long userId,
            Long bookId,
            int rating,
            String comment
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User was not found"
                ));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Book was not found"
                ));

        if (!user.isActive()) {
            throw new IllegalStateException(
                    "User account is not active"
            );
        }

        if (reviewRepository.existsByUserIdAndBookId(
                userId,
                bookId
        )) {
            throw new IllegalStateException(
                    "You have already reviewed this book"
            );
        }

        Review review = new Review();
        review.setRating(rating);
        review.setComment(comment.trim());
        review.setReviewDate(LocalDate.now());
        review.setUser(user);
        review.setBook(book);

        return reviewRepository.save(review);
    }

    public Review updateReview(
            Long id,
            Long userId,
            int rating,
            String comment
    ) {
        Review review = getReviewById(id);

        if (!review.getUser().getId().equals(userId)) {
            throw new IllegalStateException(
                    "You cannot edit this review"
            );
        }

        review.setRating(rating);
        review.setComment(comment.trim());
        review.setReviewDate(LocalDate.now());

        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        Review review = getReviewById(id);
        reviewRepository.delete(review);
    }

    private Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Review was not found"
                ));
    }
}
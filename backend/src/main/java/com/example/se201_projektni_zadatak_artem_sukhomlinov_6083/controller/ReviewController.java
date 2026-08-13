package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Review;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service.ReviewService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    public record CreateReviewRequest(
            @NotNull Long userId,
            @NotNull Long bookId,

            @Min(value = 1, message = "Minimum rating is 1")
            @Max(value = 5, message = "Maximum rating is 5")
            int rating,

            @NotBlank(message = "Comment is required")
            @Size(max = 255)
            String comment
    ) {
    }

    public record UpdateReviewRequest(
            @NotNull Long userId,

            @Min(value = 1, message = "Minimum rating is 1")
            @Max(value = 5, message = "Maximum rating is 5")
            int rating,

            @NotBlank(message = "Comment is required")
            @Size(max = 255)
            String comment
    ) {
    }

    @GetMapping("/book/{bookId}")
    public List<Review> getReviewsByBook(
            @PathVariable Long bookId
    ) {
        try {
            return reviewService.getReviewsByBook(bookId);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    exception.getMessage()
            );
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Review createReview(
            @Valid @RequestBody CreateReviewRequest request
    ) {
        try {
            return reviewService.createReview(
                    request.userId(),
                    request.bookId(),
                    request.rating(),
                    request.comment()
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    exception.getMessage()
            );
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    exception.getMessage()
            );
        }
    }

    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @Valid @RequestBody UpdateReviewRequest request
    ) {
        try {
            return reviewService.updateReview(
                    id,
                    request.userId(),
                    request.rating(),
                    request.comment()
            );
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    exception.getMessage()
            );
        } catch (IllegalStateException exception) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    exception.getMessage()
            );
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable Long id) {
        try {
            reviewService.deleteReview(id);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    exception.getMessage()
            );
        }
    }
}
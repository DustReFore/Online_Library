package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;
    private String comment;
    private LocalDate reviewDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    public Review() {}

    public Review(Long id, int rating, String comment, LocalDate reviewDate, User user, Book book) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.user = user;
        this.book = book;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public int getRating() {return rating;}
    public void setRating(int rating) {this.rating = rating;}

    public String getComment() {return comment;}
    public void setComment(String comment) {this.comment = comment;}

    public LocalDate getReviewDate() {return reviewDate;}
    public void setReviewDate(LocalDate reviewDate) {this.reviewDate = reviewDate;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public Book getBook() {return book;}
    public void setBook(Book book) {this.book = book;}
}
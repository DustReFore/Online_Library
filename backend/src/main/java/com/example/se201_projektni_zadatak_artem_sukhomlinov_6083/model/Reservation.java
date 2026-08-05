package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate reservationDate;
    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    public Reservation() {}

    public Reservation(Long id, LocalDate reservationDate, boolean active, User user, Book book) {
        this.id = id;
        this.reservationDate = reservationDate;
        this.active = active;
        this.user = user;
        this.book = book;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public LocalDate getReservationDate() {return reservationDate;}
    public void setReservationDate(LocalDate reservationDate) {this.reservationDate = reservationDate;}

    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public Book getBook() {return book;}
    public void setBook(Book book) {this.book = book;}
}
package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate loanDate;
    private LocalDate dueDate;
    private LocalDate returnDate;

    private boolean returned = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    public Loan() {}

    public Loan(Long id, LocalDate loanDate, LocalDate dueDate, LocalDate returnDate, boolean returned, User user, Book book) {
        this.id = id;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.returned = returned;
        this.user = user;
        this.book = book;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public LocalDate getLoanDate() {return loanDate;}
    public void setLoanDate(LocalDate loanDate) {this.loanDate = loanDate;}

    public LocalDate getDueDate() {return dueDate;}
    public void setDueDate(LocalDate dueDate) {this.dueDate = dueDate;}

    public LocalDate getReturnDate() {return returnDate;}
    public void setReturnDate(LocalDate returnDate) {this.returnDate = returnDate;}

    public boolean isReturned() {return returned;}
    public void setReturned(boolean returned) {this.returned = returned;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}

    public Book getBook() {return book;}
    public void setBook(Book book) {this.book = book;}
}
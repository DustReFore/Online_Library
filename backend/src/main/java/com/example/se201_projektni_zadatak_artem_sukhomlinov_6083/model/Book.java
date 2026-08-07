package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "publication_year")
    private int year;

    private boolean available = true;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Book(Long id, String title, Author author, int year, Category category) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.category = category;
    }

    public Book() {}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}

    public Author getAuthor() {return author;}
    public void setAuthor(Author author) {this.author = author;}

    public int getYear() {return year;}
    public void setYear(int year) {this.year = year;}

    public Category getCategory() {return category;}
    public void setCategory(Category category) {this.category = category;}

    public boolean isAvailable() {return available;}
    public void setAvailable(boolean available) {this.available = available;}
}
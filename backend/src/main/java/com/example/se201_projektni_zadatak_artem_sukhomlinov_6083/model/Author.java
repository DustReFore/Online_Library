package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private int yearOfBirth;
    private String country;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Book> books = new ArrayList<>();

    public Author(Long id, String firstName, String lastName, int yearOfBirth, String country) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.country = country;
    }

    public Author() {}

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public int getYearOfBirth() {return yearOfBirth;}
    public void setYearOfBirth(int yearOfBirth) {this.yearOfBirth = yearOfBirth;}

    public String getCountry() {return country;}
    public void setCountry(String country) {this.country = country;}

    public List<Book> getBooks() {return books;}
    public void setBooks(List<Book> books) {this.books = books;}
}

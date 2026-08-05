package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String position;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Admin() {}

    public Admin(Long id, String position, User user) {
        this.id = id;
        this.position = position;
        this.user = user;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getPosition() {return position;}
    public void setPosition(String position) {this.position = position;}
    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
}

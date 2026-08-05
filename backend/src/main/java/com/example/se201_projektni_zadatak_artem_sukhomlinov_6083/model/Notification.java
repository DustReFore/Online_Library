package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private LocalDateTime createdAt;
    private boolean readStatus = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Notification() {}

    public Notification(Long id, String message, LocalDateTime createdAt, boolean readStatus, User user) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt;
        this.readStatus = readStatus;
        this.user = user;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}

    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}

    public boolean isReadStatus() {return readStatus;}
    public void setReadStatus(boolean readStatus) {this.readStatus = readStatus;}

    public User getUser() {return user;}
    public void setUser(User user) {this.user = user;}
}
package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "library_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    private boolean active = true;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Loan> loans = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Review> reviews = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Notification> notifications = new ArrayList<>();

    @JsonIgnore
    private int failedLoginAttempts = 0;

    @JsonIgnore
    private LocalDateTime lockedUntil;

    public User() {}

    public User(Long id, String fullName, String email, String password, Role role, boolean active) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.active = active;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getFullName() {return fullName;}
    public void setFullName(String fullName) {this.fullName = fullName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getPassword() {return password;}
    public void setPassword(String password) {this.password = password;}

    public Role getRole() {return role;}
    public void setRole(Role role) {this.role = role;}

    public boolean isActive() {return active;}
    public void setActive(boolean active) {this.active = active;}

    public List<Loan> getLoans() {return loans;}
    public void setLoans(List<Loan> loans) {this.loans = loans;}

    public List<Reservation> getReservations() {return reservations;}
    public void setReservations(List<Reservation> reservations) {this.reservations = reservations;}

    public List<Review> getReviews() {return reviews;}
    public void setReviews(List<Review> reviews) {this.reviews = reviews;}

    public List<Notification> getNotifications() {return notifications;}
    public void setNotifications(List<Notification> notifications) {this.notifications = notifications;}

    public int getFailedLoginAttempts() {
        return failedLoginAttempts;
    }

    public void setFailedLoginAttempts(int failedLoginAttempts) {
        this.failedLoginAttempts = failedLoginAttempts;
    }

    public LocalDateTime getLockedUntil() {
        return lockedUntil;
    }

    public void setLockedUntil(LocalDateTime lockedUntil) {
        this.lockedUntil = lockedUntil;
    }
}
package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Reservation;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.ReservationRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public ReservationService(
            ReservationRepository reservationRepository,
            UserRepository userRepository,
            BookRepository bookRepository
    ) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Reservation with id " + id + " was not found"
                ));
    }

    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public List<Reservation> getActiveReservations() {
        return reservationRepository.findByActiveTrue();
    }

    @Transactional
    public Reservation createReservation(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User with id " + userId + " was not found"
                ));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Book with id " + bookId + " was not found"
                ));

        if (!user.isActive()) {
            throw new IllegalStateException("User account is not active");
        }

        if (!book.isAvailable()) {
            throw new IllegalStateException("Book is not available");
        }

        Reservation reservation = new Reservation();
        reservation.setReservationDate(LocalDate.now());
        reservation.setActive(true);
        reservation.setUser(user);
        reservation.setBook(book);

        book.setAvailable(false);
        bookRepository.save(book);

        return reservationRepository.save(reservation);
    }

    @Transactional
    public Reservation cancelReservation(Long id) {
        Reservation reservation = getReservationById(id);

        if (!reservation.isActive()) {
            throw new IllegalStateException("Reservation is already inactive");
        }

        reservation.setActive(false);

        Book book = reservation.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        Reservation reservation = getReservationById(id);
        reservationRepository.delete(reservation);
    }
}
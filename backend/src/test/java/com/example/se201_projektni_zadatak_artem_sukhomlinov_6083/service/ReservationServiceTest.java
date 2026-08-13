package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Reservation;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.User;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.ReservationRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {
    @Mock
    ReservationRepository reservationRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    BookRepository bookRepository;

    @InjectMocks
    ReservationService reservationService;

    @Test
    void shouldCreateReservation() {
        User user = new User();
        user.setActive(true);

        Book book = new Book();
        book.setAvailable(true);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(reservationRepository.save(any())).thenAnswer(result -> result.getArgument(0));

        Reservation reservation = reservationService.createReservation(1L, 1L);

        assertTrue(reservation.isActive());
        assertFalse(book.isAvailable());
    }

    @Test
    void shouldRejectUnavailableBook() {
        User user = new User();
        user.setActive(true);

        Book book = new Book();
        book.setAvailable(false);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        assertThrows(IllegalStateException.class,
                () -> reservationService
                        .createReservation(1L, 1L)
        );
    }
}

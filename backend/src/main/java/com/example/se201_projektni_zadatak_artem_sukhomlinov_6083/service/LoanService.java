package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Loan;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Reservation;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.LoanRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final ReservationRepository reservationRepository;
    private final BookRepository bookRepository;

    public LoanService(
            LoanRepository loanRepository,
            ReservationRepository reservationRepository,
            BookRepository bookRepository
    ) {
        this.loanRepository = loanRepository;
        this.reservationRepository = reservationRepository;
        this.bookRepository = bookRepository;
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public List<Loan> getLoansByUser(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    public List<Loan> getActiveLoans() {
        return loanRepository.findByReturnedFalse();
    }

    @Transactional
    public Loan issueLoan(Long reservationId) {
        Reservation reservation = reservationRepository
                .findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Reservation was not found"
                ));

        if (!reservation.isActive()) {
            throw new IllegalStateException(
                    "Reservation is not active"
            );
        }

        Book book = reservation.getBook();

        if (loanRepository.existsByBookIdAndReturnedFalse(
                book.getId()
        )) {
            throw new IllegalStateException(
                    "Book already has an active loan"
            );
        }

        Loan loan = new Loan();
        loan.setLoanDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(14));
        loan.setReturnDate(null);
        loan.setReturned(false);
        loan.setUser(reservation.getUser());
        loan.setBook(book);

        reservation.setActive(false);
        book.setAvailable(false);

        reservationRepository.save(reservation);
        bookRepository.save(book);

        return loanRepository.save(loan);
    }

    @Transactional
    public Loan returnLoan(Long id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Loan was not found"
                ));

        if (loan.isReturned()) {
            throw new IllegalStateException(
                    "Book has already been returned"
            );
        }

        loan.setReturned(true);
        loan.setReturnDate(LocalDate.now());

        Book book = loan.getBook();
        book.setAvailable(true);

        bookRepository.save(book);

        return loanRepository.save(loan);
    }
}
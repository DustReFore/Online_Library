package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan,Long> {
    List<Loan> findByUserId(Long userId);
    List<Loan> findByReturnedFalse();
}

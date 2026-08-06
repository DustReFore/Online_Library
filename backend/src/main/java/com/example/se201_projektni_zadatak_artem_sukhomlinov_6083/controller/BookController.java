package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @GetMapping("/available")
    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}

package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    public record BookRequest(
            String title,
            int year,
            boolean available,
            Long authorId,
            Long categoryId
    ) {
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @GetMapping("/available")
    public List<Book> getAvailableBooks() {
        return bookService.getAvailableBooks();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return bookService.searchByTitle(title);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book createBook(@RequestBody BookRequest request) {
        return bookService.createBook(
                request.title(),
                request.year(),
                request.available(),
                request.authorId(),
                request.categoryId()
        );
    }

    @PutMapping("/{id}")
    public Book updateBook(
            @PathVariable Long id,
            @RequestBody BookRequest request
    ) {
        return bookService.updateBook(
                id,
                request.title(),
                request.year(),
                request.available(),
                request.authorId(),
                request.categoryId()
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}
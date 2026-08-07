package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.service;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Author;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Book;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Category;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.AuthorRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.BookRepository;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;

    public BookService(
            BookRepository bookRepository,
            AuthorRepository authorRepository,
            CategoryRepository categoryRepository
    ) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Book with id " + id + " was not found"
                ));
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    public List<Book> searchByTitle(String title) {
        return bookRepository.findByTitleContainingIgnoreCase(title);
    }

    @Transactional
    public Book createBook(
            String title,
            int year,
            boolean available,
            Long authorId,
            Long categoryId
    ) {
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Author with id " + authorId + " was not found"
                ));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category with id " + categoryId + " was not found"
                ));

        Book book = new Book();
        book.setTitle(title);
        book.setYear(year);
        book.setAvailable(available);
        book.setAuthor(author);
        book.setCategory(category);

        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(
            Long id,
            String title,
            int year,
            boolean available,
            Long authorId,
            Long categoryId
    ) {
        Book book = getBookById(id);

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Author with id " + authorId + " was not found"
                ));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category with id " + categoryId + " was not found"
                ));

        book.setTitle(title);
        book.setYear(year);
        book.setAvailable(available);
        book.setAuthor(author);
        book.setCategory(category);

        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        Book book = getBookById(id);
        bookRepository.delete(book);
    }
}
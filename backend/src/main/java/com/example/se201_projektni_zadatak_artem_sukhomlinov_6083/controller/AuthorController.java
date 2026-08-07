package com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.controller;

import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.model.Author;
import com.example.se201_projektni_zadatak_artem_sukhomlinov_6083.repository.AuthorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepository authorRepository;

    public AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @GetMapping
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Author getAuthorById(@PathVariable Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Author was not found"
                ));
    }

    @GetMapping("/search")
    public List<Author> searchAuthors(@RequestParam String lastName) {
        return authorRepository.findByLastNameContainingIgnoreCase(lastName);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Author createAuthor(@RequestBody Author author) {
        author.setId(null);
        return authorRepository.save(author);
    }

    @PutMapping("/{id}")
    public Author updateAuthor(
            @PathVariable Long id,
            @RequestBody Author request
    ) {
        Author author = getAuthorById(id);

        author.setFirstName(request.getFirstName());
        author.setLastName(request.getLastName());
        author.setYearOfBirth(request.getYearOfBirth());
        author.setCountry(request.getCountry());

        return authorRepository.save(author);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuthor(@PathVariable Long id) {
        Author author = getAuthorById(id);
        authorRepository.delete(author);
    }
}
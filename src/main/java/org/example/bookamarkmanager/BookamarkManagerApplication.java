package org.example.bookamarkmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.service.BookmarkService;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api")
@SpringBootApplication
public class BookamarkManagerApplication {
    private final BookmarkService bookmarkService;

    public BookamarkManagerApplication(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BookamarkManagerApplication.class, args);
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<List<WebBookmark>> getBookmarks() throws IOException {
        return ResponseEntity.ok(bookmarkService.getAllBookmarks());
    }

    @PostMapping("/bookmarks")
    public ResponseEntity<WebBookmark> addBookmark(@RequestBody WebBookmark bookmark) throws IOException {
        WebBookmark saved = bookmarkService.addBookmark(
            bookmark.getTitle(), 
            bookmark.getUrl(), 
            bookmark.getDescription()
        );
        return ResponseEntity.ok(saved);
    }
}

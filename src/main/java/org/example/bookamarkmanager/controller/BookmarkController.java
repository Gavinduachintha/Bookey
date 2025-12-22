package org.example.bookamarkmanager.controller;

import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.service.BookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping("/bookmarks")
    public List<WebBookmark> getBookmarks() {
        return bookmarkService.getAllBookmarks();
    }

    @PostMapping("/bookmarks")
    public WebBookmark addBookmark(@RequestBody WebBookmark bookmark) {

        return bookmarkService.addBookmark(
                bookmark.getTitle(),
                bookmark.getUrl(),
                bookmark.getDescription()
        );

    }
    @PutMapping("/bookmarks/{id}")
    public ResponseEntity<WebBookmark> updateBookmark(@PathVariable String id, @RequestBody WebBookmark bookmark) {
        try {
            WebBookmark updatedBookmark = bookmarkService.updateBookmark(
                    id,
                    bookmark.getTitle(),
                    bookmark.getUrl(),
                    bookmark.getDescription()
            );
            return ResponseEntity.ok(updatedBookmark);
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/bookmarks/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable String id) {
        try {
            bookmarkService.deleteBookmark(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

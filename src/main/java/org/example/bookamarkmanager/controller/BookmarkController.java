package org.example.bookamarkmanager.controller;

import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.service.BookmarkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookmarkController {
    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping("/bookmarks")
    public ResponseEntity<?> getBookmarks() {
        try {
            List<WebBookmark> all = bookmarkService.getAllBookmarks();
            return ResponseEntity.ok(all);
        } catch (IOException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", "Failed to read bookmarks: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }

    @PostMapping("/bookmarks")
    public ResponseEntity<?> addBookmark(@RequestBody WebBookmark bookmark) {
        try {
            WebBookmark saved = bookmarkService.addBookmark(
                    bookmark.getTitle(),
                    bookmark.getUrl(),
                    bookmark.getDescription()
            );
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", "Failed to save bookmark: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
        }
    }
}


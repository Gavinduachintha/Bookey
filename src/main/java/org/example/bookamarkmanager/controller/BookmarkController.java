package org.example.bookamarkmanager.controller;

import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.service.BookmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    // ✅ GET ALL
    @GetMapping("/bookmarks")
    public List<WebBookmark> getBookmarks() {
        return bookmarkService.getAllBookmarks();
    }

    // ✅ ADD
    @PostMapping("/bookmarks")
    public WebBookmark addBookmark(@RequestBody WebBookmark bookmark) {
        return bookmarkService.addBookmark(
                bookmark.getTitle(),
                bookmark.getUrl(),
                bookmark.getDescription()
        );
    }

    // ✅ DELETE
    @DeleteMapping("/bookmarks/{id}")
    public void deleteBookmark(@PathVariable String id) {
        bookmarkService.deleteBookmark(id);
    }
}

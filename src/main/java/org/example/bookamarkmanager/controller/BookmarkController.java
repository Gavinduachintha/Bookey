package org.example.bookamarkmanager.controller;

import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.model.VideoBookmark;
import org.example.bookamarkmanager.service.BookmarkService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/api")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    // UPDATED: Get bookmarks for authenticated user only
    @GetMapping("/bookmarks")
    public List<WebBookmark> getBookmarks(Authentication authentication) {
        String username = authentication.getName();
        return bookmarkService.getAllBookmarks(username);
    }

    // UPDATED: Add bookmark with username
    @PostMapping("/bookmarks")
    public WebBookmark addBookmark(@RequestBody WebBookmark bookmark, Authentication authentication) {
        String username = authentication.getName();
        return bookmarkService.addBookmark(
                bookmark.getTitle(),
                bookmark.getUrl(),
                bookmark.getDescription(),
                bookmark.getTime(),
                username  // Pass the authenticated user
        );
    }

    // UPDATED: Update with username verification
    @PutMapping("/bookmarks/{id}")
    public ResponseEntity<WebBookmark> updateBookmark(@PathVariable String id, @RequestBody WebBookmark bookmark, Authentication authentication) {
        try {
            String username = authentication.getName();
            WebBookmark updatedBookmark = bookmarkService.updateBookmark(
                    id,
                    bookmark.getTitle(),
                    bookmark.getUrl(),
                    bookmark.getDescription(),
                    bookmark.getTime(),
                    username
            );
            return ResponseEntity.ok(updatedBookmark);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATED: Get video bookmarks for authenticated user only
    @GetMapping("/video-bookmarks")
    public List<VideoBookmark> getVideoBookmarks(Authentication authentication) {
        String username = authentication.getName();
        return bookmarkService.getAllVideoBookmarks(username);
    }

    // UPDATED: Add video bookmark with username
    @PostMapping("/video-bookmarks")
    public VideoBookmark addVideoBookmark(@RequestBody VideoBookmark bookmark, Authentication authentication) {
        String username = authentication.getName();
        return bookmarkService.addVideoBookmark(
                bookmark.getTitle(),
                bookmark.getUrl(),
                bookmark.getDescription(),
                bookmark.getVideoUrl(),
                bookmark.getDuration(),
                username  // Pass the authenticated user
        );
    }

    // UPDATED: Update video bookmark with username verification
    @PutMapping("/video-bookmarks/{id}")
    public ResponseEntity<VideoBookmark> updateVideoBookmark(@PathVariable String id, @RequestBody VideoBookmark bookmark, Authentication authentication) {
        try {
            String username = authentication.getName();
            VideoBookmark updated = bookmarkService.updateVideoBookmark(
                    id,
                    bookmark.getTitle(),
                    bookmark.getUrl(),
                    bookmark.getDescription(),
                    bookmark.getVideoUrl(),
                    bookmark.getDuration(),
                    username  // Pass the authenticated user
            );
            return ResponseEntity.ok(updated);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        } catch (NoSuchElementException | IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATED: Delete with username verification
    @DeleteMapping("/bookmarks/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable String id, Authentication authentication) {
        System.out.println("DELETE request received for bookmark ID: " + id);
        try {
            String username = authentication.getName();
            System.out.println("Authenticated user: " + username);
            bookmarkService.deleteBookmark(id, username);
            System.out.println("Bookmark deleted successfully");
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            System.out.println("Security exception: " + e.getMessage());
            return ResponseEntity.status(403).build();
        } catch (NoSuchElementException | IllegalArgumentException e) {
            System.out.println("Not found exception: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.out.println("Unexpected exception: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}
package org.example.bookamarkmanager.service;

import org.example.bookamarkmanager.model.VideoBookmark;
import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    // UPDATED: Add username parameter
    public WebBookmark addBookmark(String title, String url, String description, Integer time, String username) {
        WebBookmark bookmark = new WebBookmark(title, url, description, time);
        bookmark.setUsername(username); // Set the owner
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Add username parameter
    public VideoBookmark addVideoBookmark(String title, String url, String description, String videoUrl, int duration, String username) {
        VideoBookmark bookmark = new VideoBookmark(title, url, description, videoUrl, duration);
        bookmark.setUsername(username); // Set the owner
        return bookmarkRepository. save(bookmark);
    }

    // UPDATED: Get bookmarks for specific user only
    public List<WebBookmark> getAllBookmarks(String username) {
        return bookmarkRepository.findByUsername(username);
    }

    // UPDATED: Return only VideoBookmark instances for specific user
    public List<VideoBookmark> getAllVideoBookmarks(String username) {
        return bookmarkRepository.findByUsername(username).stream()
                .filter(b -> b instanceof VideoBookmark)
                .map(b -> (VideoBookmark) b)
                .collect(Collectors.toList());
    }

    // UPDATED: Add username verification
    public WebBookmark updateBookmark(String id, String title, String url, String description, Integer time, String username) {
        WebBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found"));

        // Verify the bookmark belongs to this user
        if (!bookmark.getUsername().equals(username)) {
            throw new SecurityException("You don't have permission to edit this bookmark");
        }

        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setTime(time);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Update a VideoBookmark with username verification
    public VideoBookmark updateVideoBookmark(String id, String title, String url, String description, String videoUrl, int duration, String username) {
        WebBookmark wb = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Video Bookmark not found"));

        if (!(wb instanceof VideoBookmark)) {
            throw new IllegalArgumentException("Bookmark is not a VideoBookmark");
        }

        // Verify the bookmark belongs to this user
        if (!wb.getUsername().equals(username)) {
            throw new SecurityException("You don't have permission to edit this bookmark");
        }

        VideoBookmark bookmark = (VideoBookmark) wb;
        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setVideoUrl(videoUrl);
        bookmark.setDuration(duration);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Add username verification for delete
    public void deleteBookmark(String id, String username) {
        WebBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found"));

        // Verify the bookmark belongs to this user
        if (!bookmark.getUsername().equals(username)) {
            throw new SecurityException("You don't have permission to delete this bookmark");
        }

        bookmarkRepository.deleteById(id);
    }
}
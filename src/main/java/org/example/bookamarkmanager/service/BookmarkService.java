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
        bookmark.setUsername(username);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Add username parameter
    public VideoBookmark addVideoBookmark(String title, String url, String description, String videoUrl, int duration, String username) {
        VideoBookmark bookmark = new VideoBookmark(title, url, description, videoUrl, duration);
        bookmark.setUsername(username);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Get bookmarks for specific user only
    public List<WebBookmark> getAllBookmarks(String username) {
        // Filter out VideoBookmark instances so the generic web bookmarks list does not include videos
        return bookmarkRepository.findByUsername(username).stream()
                .filter(b -> !(b instanceof VideoBookmark))
                .collect(Collectors.toList());
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
        System.out.println("Looking for bookmark to update with ID: " + id);

        // Get all bookmarks for this user
        List<WebBookmark> userBookmarks = bookmarkRepository.findByUsername(username);
        System.out.println("User " + username + " has " + userBookmarks.size() + " bookmarks");

        // Find the bookmark in the user's list
        WebBookmark bookmark = null;
        for (WebBookmark b : userBookmarks) {
            if (id.equals(b.getId())) {
                // Ensure it's not a VideoBookmark (web bookmarks only in this method)
                if (!(b instanceof VideoBookmark)) {
                    bookmark = b;
                }
                break;
            }
        }

        if (bookmark == null) {
            throw new IllegalArgumentException("Bookmark not found with id: " + id);
        }

        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setTime(time);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Update a VideoBookmark with username verification
    public VideoBookmark updateVideoBookmark(String id, String title, String url, String description, String videoUrl, int duration, String username) {
        System.out.println("Looking for video bookmark to update with ID: " + id);

        // Get all bookmarks for this user
        List<WebBookmark> userBookmarks = bookmarkRepository.findByUsername(username);
        System.out.println("User " + username + " has " + userBookmarks.size() + " bookmarks");

        // Find the video bookmark in the user's list
        VideoBookmark bookmark = null;
        for (WebBookmark b : userBookmarks) {
            if (id.equals(b.getId()) && b instanceof VideoBookmark) {
                bookmark = (VideoBookmark) b;
                break;
            }
        }

        if (bookmark == null) {
            throw new IllegalArgumentException("Video Bookmark not found with id: " + id);
        }

        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setVideoUrl(videoUrl);
        bookmark.setDuration(duration);
        return bookmarkRepository.save(bookmark);
    }

    // UPDATED: Add username verification for delete
    public void deleteBookmark(String id, String username) {
        System.out.println("Looking for bookmark with ID: " + id);

        // Get all bookmarks for this user
        List<WebBookmark> userBookmarks = bookmarkRepository.findByUsername(username);
        System.out.println("User " + username + " has " + userBookmarks.size() + " bookmarks");

        // Find the bookmark in the user's list
        WebBookmark bookmarkToDelete = null;
        for (WebBookmark b : userBookmarks) {
            System.out.println("  - Bookmark ID: " + b.getId() + ", Title: " + b.getTitle());
            if (id.equals(b.getId())) {
                bookmarkToDelete = b;
                break;
            }
        }

        if (bookmarkToDelete == null) {
            throw new IllegalArgumentException("Bookmark not found with id: " + id);
        }

        System.out.println("Deleting bookmark: " + bookmarkToDelete.getTitle());
        bookmarkRepository.delete(bookmarkToDelete);
        System.out.println("Bookmark deleted successfully");
    }
}
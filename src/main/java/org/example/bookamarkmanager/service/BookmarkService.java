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

    public WebBookmark addBookmark(String title, String url, String description, Integer time) {
        WebBookmark bookmark = new WebBookmark(title, url, description, time);
        return bookmarkRepository.save(bookmark);
    }

    public VideoBookmark addVideoBookmark(String title, String url, String description, String videoUrl, int duration) {
        VideoBookmark bookmark = new VideoBookmark(title, url, description, videoUrl, duration);
        return bookmarkRepository.save(bookmark);
    }

    public WebBookmark addBookmark(String title, String url, String description) {
        return addBookmark(title, url, description, null);
    }

    public List<WebBookmark> getAllBookmarks() {
        return bookmarkRepository.findAll();
    }

    // Return only VideoBookmark instances (preserves OOP and keeps repository generic)
    public List<VideoBookmark> getAllVideoBookmarks() {
        return bookmarkRepository.findAll().stream()
                .filter(b -> b instanceof VideoBookmark)
                .map(b -> (VideoBookmark) b)
                .collect(Collectors.toList());
    }

    public WebBookmark updateBookmark(String id, String title, String url, String description, Integer time) {
        WebBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found"));
        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setTime(time);
        return bookmarkRepository.save(bookmark);
    }

    public WebBookmark updateBookmark(String id, String title, String url, String description) {
        return updateBookmark(id, title, url, description, null);
    }

    // Update a VideoBookmark's fields; validate type before casting
    public VideoBookmark updateVideoBookmark(String id, String title, String url, String description, String videoUrl, int duration) {
        WebBookmark wb = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Video Bookmark not found"));
        if (!(wb instanceof VideoBookmark)) {
            throw new IllegalArgumentException("Bookmark is not a VideoBookmark");
        }
        VideoBookmark bookmark = (VideoBookmark) wb;
        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        bookmark.setVideoUrl(videoUrl);
        bookmark.setDuration(duration);
        return bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(String id) {
        bookmarkRepository.deleteById(id);
    }
}

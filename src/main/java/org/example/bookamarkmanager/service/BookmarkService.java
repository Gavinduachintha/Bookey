package org.example.bookamarkmanager.service;

import org.example.bookamarkmanager.model.WebBookmark;
import org.example.bookamarkmanager.repository.BookmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    public WebBookmark addBookmark(String title, String url, String description) {
        WebBookmark bookmark = new WebBookmark(title, url, description);
        return bookmarkRepository.save(bookmark);
    }

    public List<WebBookmark> getAllBookmarks() {
        return bookmarkRepository.findAll();
    }

    public WebBookmark updateBookmark(String id, String title, String url, String description) {
        WebBookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found"));
        bookmark.setTitle(title);
        bookmark.setUrl(url);
        bookmark.setDescription(description);
        return bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(String id) {
        bookmarkRepository.deleteById(id);
    }
}

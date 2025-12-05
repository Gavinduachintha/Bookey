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

    // ✅ CREATE BOOKMARK (MongoDB auto-generates ID)
    public WebBookmark addBookmark(String title, String url, String description) {
        WebBookmark bookmark = new WebBookmark(title, url, description);
        return bookmarkRepository.save(bookmark);
    }

    // ✅ READ ALL BOOKMARKS
    public List<WebBookmark> getAllBookmarks() {
        return bookmarkRepository.findAll();
    }

    // ✅ DELETE BOOKMARK BY ID
    public void deleteBookmark(String id) {
        bookmarkRepository.deleteById(id);
    }
}

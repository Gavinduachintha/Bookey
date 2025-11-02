package org.example.bookamarkmanager.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.bookamarkmanager.model.BookmarksData;
import org.example.bookamarkmanager.model.WebBookmark;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookmarkService {
    private static final String FILE_PATH = "src/main/resources/bookmarks.json";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BookmarkService() {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public WebBookmark addBookmark(String title, String url, String description) throws IOException {
        List<WebBookmark> bookmarks = getAllBookmarks();
        int newId = bookmarks.stream().mapToInt(WebBookmark::getId).max().orElse(0) + 1;
        WebBookmark bm = new WebBookmark(newId, title, url);
        bm.setDescription(description);
        bookmarks.add(bm);
        saveAllBookmarks(bookmarks);
        return bm;
    }

    public List<WebBookmark> getAllBookmarks() throws IOException {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        BookmarksData data = objectMapper.readValue(file, BookmarksData.class);
        return data.getBookmarks() != null ? data.getBookmarks() : new ArrayList<>();
    }

    private void saveAllBookmarks(List<WebBookmark> bookmarks) throws IOException {
        File file = new File(FILE_PATH);
        // Ensure parent directory exists; if creation fails, throw an IOException so callers know save failed.
        File parent = file.getParentFile();
        if (parent != null && !parent.exists()) {
            boolean created = parent.mkdirs();
            if (!created && !parent.exists()) {
                throw new IOException("Failed to create directories for path: " + parent.getAbsolutePath());
            }
        }
        BookmarksData data = new BookmarksData();
        data.setBookmarks(bookmarks);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
    }
}

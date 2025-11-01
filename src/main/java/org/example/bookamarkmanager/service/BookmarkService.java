package org.example.bookamarkmanager.service;
import  org.example.bookamarkmanager.model.WebBookmark;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BookmarkService {
    private final List<WebBookmark> bookmarks = new ArrayList<>();

    public WebBookmark addBookmark(String title,String url){
        WebBookmark bm = new WebBookmark(title,url);
        bookmarks.add(bm);
        return bm;
    }
    public List<WebBookmark> getAllBookmarks(){
        return Collections.unmodifiableList(bookmarks);
    }
}

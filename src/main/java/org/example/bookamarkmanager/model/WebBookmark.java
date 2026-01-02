package org.example.bookamarkmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookmarks")
public class WebBookmark extends AbstractBookmark {

    @Id
    private String id;

    private String description;

    private Integer time;

    public WebBookmark() {
    }

    public WebBookmark(String title, String url, String description) {
        super(title, url);
        this.description = description;
    }

    public WebBookmark(String title, String url, String description, Integer time) {
        super(title, url);
        this.description = description;
        this.time = time;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    @Override
    public String displayInfo() {
        return "WebBookmark: " + getTitle() + " (" + getUrl() + ")";
    }
}

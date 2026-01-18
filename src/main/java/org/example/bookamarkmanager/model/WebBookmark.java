package org.example.bookamarkmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "bookmarks")
public class WebBookmark extends AbstractBookmark {

    @Id
    @JsonProperty("id")
    private String id;

    private String description;

    private Integer time;

    private String username; // NEW: Track which user owns this bookmark

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

    // NEW:  Getter and Setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String displayInfo() {
        return "WebBookmark:  " + getTitle() + " (" + getUrl() + ")";
    }
}
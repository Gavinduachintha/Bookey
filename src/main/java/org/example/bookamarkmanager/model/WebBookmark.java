package org.example.bookamarkmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookmarks")   // ✅ MongoDB collection name
public class WebBookmark extends AbstractBookmark {

    @Id
    private String id;   // ✅ MongoDB requires String ID

    private String description;

    // Optional time (seconds) for video bookmarks
    private Integer time;

    // ✅ Required empty constructor for MongoDB
    public WebBookmark() {
    }

    // ✅ Updated constructor (NO int id now)
    public WebBookmark(String title, String url, String description) {
        super(title, url);
        this.description = description;
    }

    // Convenience constructor including time
    public WebBookmark(String title, String url, String description, Integer time) {
        super(title, url);
        this.description = description;
        this.time = time;
    }

    // ✅ MongoDB ID Getter & Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {   // ✅ String, not int
        this.id = id;
    }

    // ✅ Description Getter & Setter
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Time getter/setter
    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    // ✅ Polymorphism still works (no change needed!)
    @Override
    public String displayInfo() {
        return "WebBookmark: " + getTitle() + " (" + getUrl() + ")";
    }
}

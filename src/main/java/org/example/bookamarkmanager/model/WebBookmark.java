package org.example.bookamarkmanager.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookmarks")   // ✅ MongoDB collection name
public class WebBookmark extends AbstractBookmark {

    @Id
    private String id;   // ✅ MongoDB requires String ID

    private String description;

    // ✅ Required empty constructor for MongoDB
    public WebBookmark() {
    }

    // ✅ Updated constructor (NO int id now)
    public WebBookmark(String title, String url, String description) {
        super(title, url);
        this.description = description;
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

    // ✅ Polymorphism still works (no change needed!)
    @Override
    public String displayInfo() {
        return "WebBookmark: " + getTitle() + " (" + getUrl() + ")";
    }
}

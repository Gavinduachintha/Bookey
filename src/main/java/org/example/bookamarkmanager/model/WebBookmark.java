package org.example.bookamarkmanager.model;

public class WebBookmark extends AbstractBookmark {
    private int id;
    private String description;

    public WebBookmark() {
    }

    public WebBookmark(int id, String title, String url) {
        super(title, url);
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Polymorphism: concrete implementation
    @Override
    public String displayInfo() {
        return "WebBookmark: " + getTitle() + " (" + getUrl() + ")";
    }
}
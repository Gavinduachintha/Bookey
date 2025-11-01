package org.example.bookamarkmanager.model;

public class WebBookmark extends AbstractBookmark {

    public WebBookmark(String title, String url) {
        super(title, url);
    }

    // Polymorphism: concrete implementation
    @Override
    public String displayInfo() {
        return "WebBookmark: " + title + " (" + url + ")";
    }
}
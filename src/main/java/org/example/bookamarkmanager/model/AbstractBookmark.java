package org.example.bookamarkmanager.model;

public abstract class AbstractBookmark {
    private String url;
    private String title;
    public AbstractBookmark(String url, String title) {
        this.url = url;
        this.title = title;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url){
        this.url = url;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }

    public abstract String displayInfo();
}

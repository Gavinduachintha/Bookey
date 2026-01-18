package org.example.bookamarkmanager.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookmarks")
public class VideoBookmark extends WebBookmark {
    private String videoUrl;
    private int duration;

    // Default constructor required for MongoDB deserialization
    public VideoBookmark() {
        super();
    }

    public VideoBookmark(String title, String url, String description, String videoUrl, int duration) {
        super(title, url, description);
        this.videoUrl = videoUrl;
        this.duration = duration;

    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    @Override
    public String displayInfo() {
        return "WebBookmark: " + getTitle() + " (" + getUrl() + "), Video URL: " + videoUrl + ", Duration: " + duration + " seconds";
    }

}

package org.example.bookamarkmanager.model;

import org.example.bookamarkmanager.config.WebConfig;
import org.junit.jupiter.api.Test;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class OopConceptsTest {

    @Test
    void testOopConceptsDemonstration() {
        // Encapsulation: private fields exposed via getters/setters
        WebBookmark wb = new WebBookmark(1, "Title", "http://example.com");
        wb.setDescription("A sample bookmark");
        assertEquals("Title", wb.getTitle());
        assertEquals("http://example.com", wb.getUrl());
        assertEquals("A sample bookmark", wb.getDescription());

        wb.setTitle("Updated Title");
        assertEquals("Updated Title", wb.getTitle());

        // Inheritance & Abstraction: WebBookmark extends AbstractBookmark (abstract base)
        AbstractBookmark ab = assertInstanceOf(AbstractBookmark.class, wb);

        // Polymorphism: calling the abstract method invokes the concrete override
        String info = ab.displayInfo();
        assertNotNull(info);
        assertTrue(info.contains("Updated Title"));
        assertTrue(info.contains("http://example.com"));

        // Encapsulation in container class BookmarksData
        BookmarksData data = new BookmarksData();
        List<WebBookmark> list = new ArrayList<>();
        list.add(wb);
        data.setBookmarks(list);
        assertEquals(1, data.getBookmarks().size());

        // Abstraction via interface: WebConfig implements WebMvcConfigurer
        WebConfig wc = new WebConfig();
        assertInstanceOf(WebMvcConfigurer.class, wc);
    }
}

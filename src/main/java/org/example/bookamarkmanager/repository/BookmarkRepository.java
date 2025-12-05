package org.example.bookamarkmanager.repository;

import org.example.bookamarkmanager.model.WebBookmark;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmarkRepository extends MongoRepository<WebBookmark, String> {
}

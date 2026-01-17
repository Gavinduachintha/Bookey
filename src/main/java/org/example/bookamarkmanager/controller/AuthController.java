package org.example.bookamarkmanager.controller;

import org.example.bookamarkmanager.model.User;
import org.example.bookamarkmanager.service.UserService;
import org. springframework.http.ResponseEntity;
import org. springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<? > register(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");

            User user = userService.registerUser(username, password);
            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully",
                    "username", user.getUsername()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(Authentication authentication) {
        // If this endpoint is reached, authentication was successful
        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "username", authentication.getName()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(Map.of("username", authentication.getName()));
    }
}
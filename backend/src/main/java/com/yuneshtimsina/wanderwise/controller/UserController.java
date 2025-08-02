package com.yuneshtimsina.wanderwise.controller;

import com.yuneshtimsina.wanderwise.dto.UserRequestDTO;
import com.yuneshtimsina.wanderwise.dto.UserResponseDTO;
import com.yuneshtimsina.wanderwise.model.Role;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import com.yuneshtimsina.wanderwise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserRequestDTO dto) {
        try {
            UserResponseDTO updated = userService.updateUser(userId, dto);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

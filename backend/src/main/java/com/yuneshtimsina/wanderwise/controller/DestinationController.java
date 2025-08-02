package com.yuneshtimsina.wanderwise.controller;

import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @GetMapping
    public ResponseEntity<?> getAllDestinations() {
        List<Destination> all = destinationService.getAllDestinations();
        if (all != null && !all.isEmpty()) {
            return new ResponseEntity<>(all, HttpStatus.OK);
        } else {
            System.out.println("No destinations found.");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDestinationById(@PathVariable Long id) {
        try {
            Destination destination = destinationService.getDestinationById(id);
            return new ResponseEntity<>(destination, HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println("Destination not found: " + e.getMessage());
            return new ResponseEntity<>("Destination not found for id: "+id, HttpStatus.NOT_FOUND);
        }
    }
}

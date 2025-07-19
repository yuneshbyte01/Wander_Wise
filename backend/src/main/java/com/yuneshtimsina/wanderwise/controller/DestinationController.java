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

    // Create
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createDestination(@RequestBody Destination destination) {
        try {
            Destination created = destinationService.createDestination(destination);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Error creating destination: " + e.getMessage());
            return new ResponseEntity<>("Failed to create destination.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Read All
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

    // Read One
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

    // Update
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDestination(@PathVariable Long id, @RequestBody Destination destination) {
        try {
            Destination updated = destinationService.updateDestination(id, destination);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println("Error updating destination: " + e.getMessage());
            return new ResponseEntity<>("Destination not found or update failed.", HttpStatus.NOT_FOUND);
        }
    }

    // Delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDestination(@PathVariable Long id) {
        try {
            destinationService.deleteDestination(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            System.out.println("Error deleting destination: " + e.getMessage());
            return new ResponseEntity<>("Destination not found.", HttpStatus.NOT_FOUND);
        }
    }
}

package com.yuneshtimsina.wanderwise.controller;

import com.yuneshtimsina.wanderwise.dto.WishlistResponseDTO;
import com.yuneshtimsina.wanderwise.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // Add to wishlist
    @PostMapping("/{userId}/{destinationId}")
    public ResponseEntity<?> addToWishlist(@PathVariable Long userId, @PathVariable Long destinationId) {
        try {
            WishlistResponseDTO added = wishlistService.addToWishlist(userId, destinationId);
            return new ResponseEntity<>(added, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.out.println("Error adding to wishlist: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Error adding to wishlist: " + e.getMessage());
            return new ResponseEntity<>("Failed to add to wishlist.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get user's wishlist
    @GetMapping("/{userId}")
    public ResponseEntity<?> getWishlist(@PathVariable Long userId) {
        try {
            List<WishlistResponseDTO> wishlist = wishlistService.getWishlistByUserId(userId);
            if (wishlist != null && !wishlist.isEmpty()) {
                return new ResponseEntity<>(wishlist, HttpStatus.OK);
            } else {
                System.out.println("Wishlist is empty for user: " + userId);
                return new ResponseEntity<>(wishlist, HttpStatus.OK); // Return empty array instead of NO_CONTENT
            }
        } catch (RuntimeException e) {
            System.out.println("Error getting wishlist: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Error getting wishlist: " + e.getMessage());
            return new ResponseEntity<>("Failed to get wishlist.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get specific wishlist item
    @GetMapping("/item/{id}")
    public ResponseEntity<?> getWishlistItem(@PathVariable Long id) {
        try {
            WishlistResponseDTO item = wishlistService.getWishlistItemById(id);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (RuntimeException e) {
            System.out.println("Wishlist item not found: " + e.getMessage());
            return new ResponseEntity<>("Wishlist item not found for id: " + id, HttpStatus.NOT_FOUND);
        }
    }

    // Remove from wishlist
    @DeleteMapping("/{userId}/{destinationId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Long userId, @PathVariable Long destinationId) {
        try {
            wishlistService.removeFromWishlist(userId, destinationId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            System.out.println("Error removing from wishlist: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Error removing from wishlist: " + e.getMessage());
            return new ResponseEntity<>("Failed to remove from wishlist.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete specific wishlist item
    @DeleteMapping("/item/{id}")
    public ResponseEntity<?> deleteWishlistItem(@PathVariable Long id) {
        try {
            wishlistService.deleteWishlistItem(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            System.out.println("Error deleting wishlist item: " + e.getMessage());
            return new ResponseEntity<>("Wishlist item not found.", HttpStatus.NOT_FOUND);
        }
    }

    // Check if destination is in wishlist
    @GetMapping("/{userId}/check/{destinationId}")
    public ResponseEntity<?> checkWishlistStatus(@PathVariable Long userId, @PathVariable Long destinationId) {
        try {
            boolean isInWishlist = wishlistService.isInWishlist(userId, destinationId);
            return new ResponseEntity<>(isInWishlist, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error checking wishlist status: " + e.getMessage());
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    // Get wishlist count
    @GetMapping("/{userId}/count")
    public ResponseEntity<?> getWishlistCount(@PathVariable Long userId) {
        try {
            long count = wishlistService.getWishlistCount(userId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error getting wishlist count: " + e.getMessage());
            return new ResponseEntity<>(0L, HttpStatus.OK);
        }
    }

    // Clear wishlist
    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<?> clearWishlist(@PathVariable Long userId) {
        try {
            wishlistService.clearWishlist(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            System.out.println("Error clearing wishlist: " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            System.out.println("Error clearing wishlist: " + e.getMessage());
            return new ResponseEntity<>("Failed to clear wishlist.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 
package com.yuneshtimsina.wanderwise.controller;

import com.yuneshtimsina.wanderwise.dto.RecommendationDTO;
import com.yuneshtimsina.wanderwise.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getRecommendations(@PathVariable Long userId) {
        try {
            List<RecommendationDTO> recommendations = recommendationService.getRecommendationsForUser(userId);
            if (recommendations.isEmpty()) {
                return new ResponseEntity<>("No matching destinations found.", HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(recommendations, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}

package com.yuneshtimsina.wanderwise.service;

import com.yuneshtimsina.wanderwise.dto.RecommendationDTO;
import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<RecommendationDTO> getRecommendations(Long userId) {
        // Get user preferences
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get all destinations
        List<Destination> allDestinations = destinationRepository.findAll();

        // Calculate match scores and create recommendations
        return allDestinations.stream()
                .map(destination -> {
                    int matchScore = calculateMatchScore(user, destination);
                    return RecommendationDTO.builder()
                            .id(destination.getId())
                            .name(destination.getName())
                            .matchScore(matchScore)
                            .tags(destination.getTags())
                            .averageCost(destination.getAverageCost())
                            .bestSeason(destination.getBestSeason())
                            .imageUrl(destination.getImageUrl()) // Add this
                            .place(destination.getPlace()) // Add this
                            .description(destination.getDescription()) // Add this
                            .build();
                })
                .filter(recommendation -> recommendation.getMatchScore() > 30) // Only show recommendations with >30% match
                .sorted((r1, r2) -> Integer.compare(r2.getMatchScore(), r1.getMatchScore())) // Sort by match score
                .collect(Collectors.toList());
    }

    private int calculateMatchScore(User user, Destination destination) {
        int score = 0;
        
        // Budget match (40% weight)
        if (user.getBudget() != null && destination.getAverageCost() != null) {
            double budgetRatio = user.getBudget() / destination.getAverageCost();
            if (budgetRatio >= 1.5) score += 40; // Well within budget
            else if (budgetRatio >= 1.0) score += 30; // Within budget
            else if (budgetRatio >= 0.7) score += 20; // Slightly over budget
            else if (budgetRatio >= 0.5) score += 10; // Over budget but manageable
        }

        // Season match (30% weight)
        if (user.getPreferredSeason() != null && destination.getBestSeason() != null) {
            if (user.getPreferredSeason().equalsIgnoreCase(destination.getBestSeason())) {
                score += 30;
            } else if (isSeasonCompatible(user.getPreferredSeason(), destination.getBestSeason())) {
                score += 15;
            }
        }

        // Interests match (30% weight)
        if (user.getInterests() != null && destination.getTags() != null) {
            String[] userInterests = user.getInterests().toLowerCase().split(",");
            String[] destinationTags = destination.getTags().toLowerCase().split(",");
            
            int matchingTags = 0;
            for (String interest : userInterests) {
                for (String tag : destinationTags) {
                    if (interest.trim().equals(tag.trim())) {
                        matchingTags++;
                        break;
                    }
                }
            }
            
            if (matchingTags > 0) {
                score += Math.min(30, matchingTags * 10);
            }
        }

        return Math.min(100, score);
    }

    private boolean isSeasonCompatible(String userSeason, String destinationSeason) {
        // Define season compatibility
        if (userSeason.equalsIgnoreCase("spring") && 
            (destinationSeason.equalsIgnoreCase("spring") || destinationSeason.equalsIgnoreCase("summer"))) {
            return true;
        }
        if (userSeason.equalsIgnoreCase("summer") && 
            (destinationSeason.equalsIgnoreCase("summer") || destinationSeason.equalsIgnoreCase("autumn"))) {
            return true;
        }
        if (userSeason.equalsIgnoreCase("autumn") && 
            (destinationSeason.equalsIgnoreCase("autumn") || destinationSeason.equalsIgnoreCase("winter"))) {
            return true;
        }
        if (userSeason.equalsIgnoreCase("winter") && 
            (destinationSeason.equalsIgnoreCase("winter") || destinationSeason.equalsIgnoreCase("spring"))) {
            return true;
        }
        return false;
    }
}

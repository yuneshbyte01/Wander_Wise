package com.yuneshtimsina.wanderwise.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.yuneshtimsina.wanderwise.dto.RecommendationDTO;
import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import com.yuneshtimsina.wanderwise.repository.UserRepository;

@Service
public class RecommendationService {

    @Value("${recommendation.weight.budget:0.4}")
    private double BUDGET_WEIGHT;

    @Value("${recommendation.weight.season:0.3}")
    private double SEASON_WEIGHT;

    @Value("${recommendation.weight.interests:0.3}")
    private double INTERESTS_WEIGHT;

    // Increased minimum score to 50 for better quality recommendations
    @Value("${recommendation.minimum.score:50}")
    private int MINIMUM_SCORE;

    private static final Map<String, Map<String, Integer>> SEASON_COMPATIBILITY_MATRIX = new HashMap<>();

    static {
        // Initialize season compatibility matrix
        Map<String, Integer> springScores = new HashMap<>();
        springScores.put("spring", 30);
        springScores.put("summer", 20);
        springScores.put("autumn", 20);
        springScores.put("winter", 10);
        SEASON_COMPATIBILITY_MATRIX.put("spring", springScores);

        Map<String, Integer> summerScores = new HashMap<>();
        summerScores.put("spring", 20);
        summerScores.put("summer", 30);
        summerScores.put("autumn", 20);
        summerScores.put("winter", 10);
        SEASON_COMPATIBILITY_MATRIX.put("summer", summerScores);

        Map<String, Integer> autumnScores = new HashMap<>();
        autumnScores.put("spring", 20);
        autumnScores.put("summer", 20);
        autumnScores.put("autumn", 30);
        autumnScores.put("winter", 20);
        SEASON_COMPATIBILITY_MATRIX.put("autumn", autumnScores);

        Map<String, Integer> winterScores = new HashMap<>();
        winterScores.put("spring", 10);
        winterScores.put("summer", 10);
        winterScores.put("autumn", 20);
        winterScores.put("winter", 30);
        SEASON_COMPATIBILITY_MATRIX.put("winter", winterScores);
    }

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
                    double matchScore = calculateMatchScore(user, destination);
                    return RecommendationDTO.builder()
                            .id(destination.getId())
                            .name(destination.getName())
                            .matchScore((int) Math.round(matchScore))
                            .tags(destination.getTags())
                            .averageCost(destination.getAverageCost())
                            .bestSeason(destination.getBestSeason())
                            .imageUrl(destination.getImageUrl())
                            .place(destination.getPlace())
                            .description(destination.getDescription())
                            .build();
                })
                // Only show high-quality matches (above 50%)
                .filter(recommendation -> recommendation.getMatchScore() >= MINIMUM_SCORE)
                // Sort by match score in descending order
                .sorted((r1, r2) -> Integer.compare(r2.getMatchScore(), r1.getMatchScore()))
                .collect(Collectors.toList());
    }

    private double calculateMatchScore(User user, Destination destination) {
        double budgetScore = calculateBudgetScore(user.getBudget(), destination.getAverageCost());
        double seasonScore = calculateSeasonScore(user.getPreferredSeason(), destination.getBestSeason());
        double interestsScore = calculateInterestsScore(user.getInterests(), destination.getTags());

        // Calculate weighted total score
        return (budgetScore * BUDGET_WEIGHT) +
               (seasonScore * SEASON_WEIGHT) +
               (interestsScore * INTERESTS_WEIGHT);
    }

    private double calculateBudgetScore(Double userBudget, Double destinationCost) {
        if (userBudget == null || destinationCost == null) {
            return 0;
        }

        if (destinationCost <= userBudget) {
            return 100; // Full score if within budget
        } else {
            // Calculate penalty based on how much over budget
            double overBudgetRatio = (destinationCost - userBudget) / userBudget;
            return Math.max(0, 100 - (overBudgetRatio * 100)); // Linear penalty
        }
    }

    private double calculateSeasonScore(String userSeason, String destinationSeason) {
        if (userSeason == null || destinationSeason == null) {
            return 0;
        }

        userSeason = userSeason.toLowerCase().trim();
        destinationSeason = destinationSeason.toLowerCase().trim();

        Map<String, Integer> compatibilityScores = SEASON_COMPATIBILITY_MATRIX.get(userSeason);
        if (compatibilityScores == null) {
            return 0;
        }

        return compatibilityScores.getOrDefault(destinationSeason, 0) * (100.0 / 30.0); // Normalize to 0-100
    }

    private double calculateInterestsScore(String userInterests, String destinationTags) {
        if (userInterests == null || destinationTags == null) {
            return 0;
        }

        Set<String> interests = Arrays.stream(userInterests.toLowerCase().split(","))
                .map(String::trim)
                .collect(Collectors.toSet());

        Set<String> tags = Arrays.stream(destinationTags.toLowerCase().split(","))
                .map(String::trim)
                .collect(Collectors.toSet());

        if (interests.isEmpty()) {
            return 0;
        }

        // Calculate Jaccard similarity: intersection size / union size
        Set<String> intersection = new HashSet<>(interests);
        intersection.retainAll(tags);

        Set<String> union = new HashSet<>(interests);
        union.addAll(tags);

        if (union.isEmpty()) {
            return 0;
        }

        // Return score from 0-100
        return (intersection.size() / (double) union.size()) * 100;
    }
}

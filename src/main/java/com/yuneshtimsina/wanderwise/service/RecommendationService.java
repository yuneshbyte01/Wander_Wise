package com.yuneshtimsina.wanderwise.service;

import com.yuneshtimsina.wanderwise.dto.RecommendationDTO;
import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    public List<RecommendationDTO> getRecommendationsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        List<Destination> destinations = destinationRepository.findAll();

        String[] userInterests = Optional.ofNullable(user.getInterests())
                .map(s -> s.toLowerCase().split(","))
                .orElse(new String[0]);
        Set<String> userInterestSet = Arrays.stream(userInterests)
                .map(String::trim)
                .collect(Collectors.toSet());

        List<RecommendationDTO> recommendations = new ArrayList<>();

        for (Destination dest : destinations) {
            int score = 0;

            // Budget check
            if (dest.getAverageCost() != null && user.getBudget() != null && dest.getAverageCost() <= user.getBudget()) {
                score += 1;
            }

            // Season check (a case-insensitive)
            if (dest.getBestSeason() != null && user.getPreferredSeason() != null
                    && dest.getBestSeason().equalsIgnoreCase(user.getPreferredSeason())) {
                score += 1;
            }

            // Interests overlap
            int interestMatches = 0;
            if (dest.getTags() != null && !dest.getTags().isBlank()) {
                String[] destTags = dest.getTags().toLowerCase().split(",");
                Set<String> destTagSet = Arrays.stream(destTags).map(String::trim).collect(Collectors.toSet());

                for (String interest : userInterestSet) {
                    if (destTagSet.contains(interest)) {
                        interestMatches++;
                    }
                }
            }
            score += interestMatches;

            if (score > 0) { // Only include destinations with some score
                recommendations.add(RecommendationDTO.builder()
                        .name(dest.getName())
                        .matchScore(score)
                        .tags(dest.getTags())
                        .averageCost(dest.getAverageCost())
                        .bestSeason(dest.getBestSeason())
                        .build());
            }
        }

        // Sort descending by score
        recommendations.sort(Comparator.comparingInt(RecommendationDTO::getMatchScore).reversed());

        return recommendations;
    }
}

package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationDTO {
    private Long id;
    private String name;
    private int matchScore;
    private String tags;
    private Double averageCost;
    private String bestSeason;
    private String imageUrl; // Add this field
    private String place; // Add this field for consistency
    private String description; // Add this field for consistency
}

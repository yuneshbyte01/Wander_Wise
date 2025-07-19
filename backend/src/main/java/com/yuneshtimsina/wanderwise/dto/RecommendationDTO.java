package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationDTO {
    private String name;
    private int matchScore;
    private String tags;
    private Double averageCost;
    private String bestSeason;
}

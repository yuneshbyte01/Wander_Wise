package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationDTO {
    private Long id;
    private String name;
    private String place;
    private Double averageCost;
    private String bestSeason;
    private String tags;
    private String description;
    private String imageUrl;
} 
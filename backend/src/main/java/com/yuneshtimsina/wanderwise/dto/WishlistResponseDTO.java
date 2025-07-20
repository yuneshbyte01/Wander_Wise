package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WishlistResponseDTO {
    private Long id;
    private Long userId;
    private Long destinationId;
    private String destinationName;
    private String destinationPlace;
    private Double destinationCost;
    private String destinationSeason;
    private String destinationTags;
    private String destinationDescription;
    private String destinationImageUrl;
    private LocalDateTime addedAt;
} 
package com.yuneshtimsina.wanderwise.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "destinations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String place;

    @Column(name = "average_cost")
    private Double averageCost;

    @Column(name = "best_season")
    private String bestSeason;

    // CSV-style tags (e.g., "beach,adventure")
    private String tags;

    @Column(length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

}

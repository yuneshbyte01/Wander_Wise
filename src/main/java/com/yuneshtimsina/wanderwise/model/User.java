package com.yuneshtimsina.wanderwise.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    // CSV: "adventure,nature"
    private String interests;

    private Double budget;

    @Column(name = "preferred_season")
    private String preferredSeason;
}

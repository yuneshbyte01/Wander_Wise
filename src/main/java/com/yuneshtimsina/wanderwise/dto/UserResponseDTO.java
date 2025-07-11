package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String interests;
    private Double budget;
    private String preferredSeason;
}

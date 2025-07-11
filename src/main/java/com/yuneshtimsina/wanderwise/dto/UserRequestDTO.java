package com.yuneshtimsina.wanderwise.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequestDTO {
    private String name;
    private String email;
    private String password;
    private String interests;
    private Double budget;
    private String preferredSeason;
}

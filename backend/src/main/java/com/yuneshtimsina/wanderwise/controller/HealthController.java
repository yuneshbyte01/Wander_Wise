package com.yuneshtimsina.wanderwise.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {
    @GetMapping("/ping")
    public String ping() {
        return "WanderWise backend is live!";
    }
}

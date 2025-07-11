package com.yuneshtimsina.wanderwise.security.auth;

import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import com.yuneshtimsina.wanderwise.security.jwt.JwtUtil;
import lombok.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .interests(request.getInterests())
                .budget(request.getBudget())
                .preferredSeason(request.getPreferredSeason())
                .build();

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            return ResponseEntity.ok(new JwtResponse(jwt));
        } catch (Exception e) {
            e.printStackTrace(); // Add this to log the actual error
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


    @Data
    static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String interests;
        private Double budget;
        private String preferredSeason;
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @AllArgsConstructor
    static class JwtResponse {
        private String token;
    }
}

package com.yuneshtimsina.wanderwise.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yuneshtimsina.wanderwise.dto.UserRequestDTO;
import com.yuneshtimsina.wanderwise.dto.UserResponseDTO;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import com.yuneshtimsina.wanderwise.repository.WishlistRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        return mapToResponse(user);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Only update if values are provided (null-safe)
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPassword() != null) user.setPassword(passwordEncoder.encode(dto.getPassword()));
        if (dto.getInterests() != null) user.setInterests(dto.getInterests());
        if (dto.getBudget() != null) user.setBudget(dto.getBudget());
        if (dto.getPreferredSeason() != null) user.setPreferredSeason(dto.getPreferredSeason());

        User updated = userRepository.save(user);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        
        // First delete all wishlist items for this user
        wishlistRepository.deleteByUserId(id);
        
        // Then delete the user
        userRepository.delete(user);
    }

    private UserResponseDTO mapToResponse(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .interests(user.getInterests())
                .budget(user.getBudget())
                .preferredSeason(user.getPreferredSeason())
                .build();
    }
}

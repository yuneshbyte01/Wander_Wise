package com.yuneshtimsina.wanderwise.service;

import com.yuneshtimsina.wanderwise.dto.WishlistResponseDTO;
import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.model.User;
import com.yuneshtimsina.wanderwise.model.WishlistItem;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import com.yuneshtimsina.wanderwise.repository.UserRepository;
import com.yuneshtimsina.wanderwise.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    public WishlistResponseDTO addToWishlist(Long userId, Long destinationId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + destinationId));

        if (wishlistRepository.existsByUserIdAndDestinationId(userId, destinationId)) {
            throw new RuntimeException("Destination is already in your wishlist");
        }

        WishlistItem wishlistItem = WishlistItem.builder()
                .user(user)
                .destination(destination)
                .build();

        WishlistItem saved = wishlistRepository.save(wishlistItem);
        return mapToDTO(saved);
    }

    public List<WishlistResponseDTO> getWishlistByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        List<WishlistItem> wishlistItems = wishlistRepository.findByUserIdOrderByAddedAtDesc(userId);
        return wishlistItems.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public WishlistResponseDTO getWishlistItemById(Long id) {
        WishlistItem wishlistItem = wishlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found with id: " + id));
        return mapToDTO(wishlistItem);
    }

    public void removeFromWishlist(Long userId, Long destinationId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        if (!wishlistRepository.existsByUserIdAndDestinationId(userId, destinationId)) {
            throw new RuntimeException("Destination is not in your wishlist");
        }

        wishlistRepository.deleteByUserIdAndDestinationId(userId, destinationId);
    }

    public void deleteWishlistItem(Long id) {
        WishlistItem wishlistItem = wishlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found with id: " + id));
        wishlistRepository.delete(wishlistItem);
    }

    public boolean isInWishlist(Long userId, Long destinationId) {
        if (!userRepository.existsById(userId)) {
            return false;
        }
        return wishlistRepository.existsByUserIdAndDestinationId(userId, destinationId);
    }

    public long getWishlistCount(Long userId) {
        if (!userRepository.existsById(userId)) {
            return 0L;
        }
        return wishlistRepository.countByUserId(userId);
    }

    public void clearWishlist(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        List<WishlistItem> items = wishlistRepository.findByUserIdOrderByAddedAtDesc(userId);
        wishlistRepository.deleteAll(items);
    }

    private WishlistResponseDTO mapToDTO(WishlistItem wishlistItem) {
        Destination destination = wishlistItem.getDestination();
        
        return WishlistResponseDTO.builder()
                .id(wishlistItem.getId())
                .userId(wishlistItem.getUser().getId())
                .destinationId(destination.getId())
                .destinationName(destination.getName())
                .destinationPlace(destination.getPlace())
                .destinationCost(destination.getAverageCost())
                .destinationSeason(destination.getBestSeason())
                .destinationTags(destination.getTags())
                .destinationDescription(destination.getDescription())
                .destinationImageUrl(destination.getImageUrl())
                .addedAt(wishlistItem.getAddedAt())
                .build();
    }
} 
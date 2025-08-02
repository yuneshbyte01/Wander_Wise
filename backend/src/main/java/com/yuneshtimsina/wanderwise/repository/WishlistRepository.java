package com.yuneshtimsina.wanderwise.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yuneshtimsina.wanderwise.model.WishlistItem;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserIdOrderByAddedAtDesc(Long userId);
    Optional<WishlistItem> findByUserIdAndDestinationId(Long userId, Long destinationId);
    boolean existsByUserIdAndDestinationId(Long userId, Long destinationId);
    void deleteByUserIdAndDestinationId(Long userId, Long destinationId);
    void deleteByDestinationId(Long destinationId);
    void deleteByUserId(Long userId);
    long countByUserId(Long userId);
} 
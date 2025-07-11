package com.yuneshtimsina.wanderwise.repository;

import com.yuneshtimsina.wanderwise.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    // You can add custom queries later if needed
}

package com.yuneshtimsina.wanderwise.service;

import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import com.yuneshtimsina.wanderwise.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
    }

    public Destination updateDestination(Long id, Destination updatedDestination) {
        Destination existing = getDestinationById(id);
        existing.setName(updatedDestination.getName());
        existing.setPlace(updatedDestination.getPlace());
        existing.setAverageCost(updatedDestination.getAverageCost());
        existing.setBestSeason(updatedDestination.getBestSeason());
        existing.setTags(updatedDestination.getTags());
        existing.setDescription(updatedDestination.getDescription());
        return destinationRepository.save(existing);
    }

    @Transactional
    public void deleteDestination(Long id) {
        Destination destination = getDestinationById(id);
        
        // First delete any wishlist items that reference this destination
        wishlistRepository.deleteByDestinationId(id);
        
        // Then delete the destination
        destinationRepository.delete(destination);
    }
}

package com.yuneshtimsina.wanderwise.service;

import com.yuneshtimsina.wanderwise.model.Destination;
import com.yuneshtimsina.wanderwise.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

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

    public void deleteDestination(Long id) {
        Destination destination = getDestinationById(id);
        destinationRepository.delete(destination);
    }
}

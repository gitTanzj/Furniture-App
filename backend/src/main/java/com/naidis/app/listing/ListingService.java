/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.naidis.app.listing;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.naidis.app.user.User;

import jakarta.transaction.Transactional;

/**
 *
 * @author kalle
 */
@Component
public class ListingService {
    private final ListingRepository listingRepository;

    @Autowired
    public ListingService(ListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }
    
    public List<Listing> getListings() {
        return listingRepository.findAll();
    }

    public List<Listing> getListingsById(String id) {
        return listingRepository.findAll().stream()
            .filter(listing -> listing.getId().toLowerCase().contains(id))
            .collect(Collectors.toList());
    }

    public List<Listing> getListingsByUser(User user) {
        return listingRepository.findAll().stream()
            .filter(listing -> listing.getUser().getId().equals(user.getId()))
            .collect(Collectors.toList());
    }

    public Listing updateListing(Listing updatedListing) {
        Optional<Listing> existingListing = listingRepository.findById(updatedListing.getId());

        if(existingListing.isPresent()) {
            Listing listingToUpdate = existingListing.get();
            listingToUpdate.setName(updatedListing.getName());
            listingToUpdate.setCategory(updatedListing.getCategory());
            listingToUpdate.setDescription(updatedListing.getDescription());
            listingToUpdate.setPrice(updatedListing.getPrice());
            listingToUpdate.setImageUrl(updatedListing.getImageUrl());

            listingRepository.save(listingToUpdate);
            return listingToUpdate;
        }
        return null;
    }

    public Listing addListing(Listing listing) {
        listingRepository.save(listing);
        return listing;
    }

    @Transactional
    public void deleteListing(String id){
        listingRepository.deleteById(id);
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.naidis.app.listing;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kalle
 */
public interface ListingRepository extends JpaRepository<Listing, String> {

    @Override
    void deleteById(String id);

    @Override
    Optional<Listing> findById(String id);
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.naidis.app.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author kalle
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Override
    void deleteById(String id);

    @Override
    Optional<User> findById(String id);
}

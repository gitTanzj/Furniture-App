/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.naidis.app.user;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;


/**
 *
 * @author kalle
 */
@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public List<User> getUserById(String id) {
        return userRepository.findAll().stream()
            .filter(user -> user.getId().toLowerCase().contains(id.toLowerCase()))
            .collect(Collectors.toList());
    }   

    public User addUser(User user) {
        userRepository.save(user);
        return user;
    }

    public User updateUser(User updatedUser) {
        Optional<User> existingUser = userRepository.findById(updatedUser.getId());

        if(existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setUsername(updatedUser.getUsername());
            userToUpdate.setEmail(updatedUser.getEmail());
            userToUpdate.setPassword(updatedUser.getPassword());

            userRepository.save(userToUpdate);
            return userToUpdate;
        }
        return null;
    }

    @Transactional
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}

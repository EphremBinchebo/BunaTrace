package com.coffeetrace.actor;


import com.coffeetrace.users.Actor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmerRepository extends JpaRepository<Actor, UUID> {

    // Only return actors of type "FARMER"
    List<Actor> findByType(String type);

    // Find farmer by ID safely
    Optional<Actor> findById(UUID id);
}


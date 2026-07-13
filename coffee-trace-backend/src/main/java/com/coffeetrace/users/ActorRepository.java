package com.coffeetrace.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ActorRepository extends JpaRepository<Actor, UUID> {

    List<Actor> findByActiveTrue();

    List<Actor> findByTypeAndActiveTrue(ActorType type);

    Optional<Actor> findByIdAndActiveTrue(UUID id);

    boolean existsByNameAndTypeAndActiveTrue(
            String name,
            ActorType type
    );
    long countByType(ActorType type);

    long countByTypeAndActiveTrue(ActorType type);

}
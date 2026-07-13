package com.coffeetrace.station;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface StationRepository extends JpaRepository<Station, UUID> {


    boolean existsByName(String name);

    Optional<Station> findByName(String name);
}
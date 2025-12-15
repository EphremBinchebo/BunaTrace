package com.coffeetrace.supplychain;

import com.coffeetrace.supplychain.GreenLot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface GreenLotRepository extends JpaRepository<GreenLot, String> {
    Optional<GreenLot> findByLotCode(String lotCode);
}
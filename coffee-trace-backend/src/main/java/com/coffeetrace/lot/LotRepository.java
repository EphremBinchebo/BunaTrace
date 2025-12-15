package com.coffeetrace.lot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LotRepository extends JpaRepository<Lot, UUID> {

    Optional<Lot> findByQrCode(String qrCode);

    Optional<Lot> findByLotCode(String lotCode);

    boolean existsByQrCode(String qrCode);
}
package com.coffeetrace.supplychain;
import com.coffeetrace.supplychain.ExportLot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ExportLotRepository extends JpaRepository<ExportLot, UUID> {
    Optional<ExportLot> findByExportCode(String exportCode);

//    Optional<Object> findById(UUID exportLotId);
}
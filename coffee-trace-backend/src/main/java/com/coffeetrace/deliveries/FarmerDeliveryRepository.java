package com.coffeetrace.deliveries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FarmerDeliveryRepository extends JpaRepository<FarmerDelivery, UUID> {

    List<FarmerDelivery> findByWashingStation_Id(UUID stationId);

    List<FarmerDelivery> findByBatch_Id(UUID batchId);
    List<FarmerDelivery> findByWashingStationIdAndBatchIsNull(UUID stationId);

   // Optional<Object> findByReceiptNumber(String qrCode);
    Optional<FarmerDelivery> findByReceiptNumber(String receiptNumber);
}


package com.coffeetrace.batch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BatchRepository extends JpaRepository<Batch, UUID> {

    Optional<Batch> findByQrCode(String qrCode);

    Optional<Batch> findByBatchCode(String batchCode);

    boolean existsByQrCode(String qrCode);

    boolean existsByBatchCode(String batchCode);
    List<Batch> findTop8ByBatchCodeContainingIgnoreCaseOrderByBatchCodeAsc(String keyword);
}
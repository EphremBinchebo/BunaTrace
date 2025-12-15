package com.coffeetrace.supplychain;

import com.coffeetrace.supplychain.DryMillBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DryMillBatchRepository extends JpaRepository<DryMillBatch, UUID> {}
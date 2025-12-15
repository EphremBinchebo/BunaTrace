package com.coffeetrace.farms;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;


//@Repository
//public interface FarmRepository extends JpaRepository<Farm, UUID> {
//
//    @Query("SELECT f FROM Farm f WHERE f.farmer.id = :farmerId")
//    List<Farm> findFarmsByFarmerId(@Param("farmerId") String farmerId);
//
////    Collection<Object> findFarmerById(String id);
//}

@Repository
public interface FarmRepository extends JpaRepository<Farm, UUID> {

    @Query("SELECT f FROM Farm f WHERE f.farmer.id = :farmerId")
    List<Farm> findFarmsByFarmerId(@Param("farmerId") UUID farmerId);
}

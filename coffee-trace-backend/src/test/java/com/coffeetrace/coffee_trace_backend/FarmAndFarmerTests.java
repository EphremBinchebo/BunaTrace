package com.coffeetrace.coffee_trace_backend;

import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
class FarmAndFarmerTests {

    @Autowired
    private ActorRepository actorRepository;

    @Autowired
    private FarmRepository farmRepository;



    @Test
    void testCreateFarmerAndFarm() {

        // 1. Create Farmer
        Actor farmer = Actor.builder()
                .name("Abebe Kebede")
                .type(ActorType.FARMER)
                .region("Oromia")
                .zone("Jimma")
                .woreda("Limu")
                .kebele("02")
                .build();

        farmer = actorRepository.save(farmer);

        assertNotNull(farmer.getId());

        // 2. Create Farm linked to this farmer
        Farm farm = Farm.builder()
                .name("Limu Coffee Farm")
                .farmer(farmer)
                .areaHectares(2.5)
                .elevation(1950)
                .region("Oromia")
                .zone("Jimma")
                .woreda("Limu")
                .kebele("02")
                .build();

        farm = farmRepository.save(farm);

        assertNotNull(farm.getId());
        assertEquals(farmer.getId(), farm.getFarmer().getId());

        // 3. Fetch from DB and verify relationship
        Optional<Farm> fetched = farmRepository.findById(farm.getId());

        assertTrue(fetched.isPresent());
        assertEquals("Limu Coffee Farm", fetched.get().getName());
        assertEquals("Abebe Kebede", fetched.get().getFarmer().getName());
    }
}

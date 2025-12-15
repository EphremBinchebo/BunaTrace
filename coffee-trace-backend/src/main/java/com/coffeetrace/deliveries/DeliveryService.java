package com.coffeetrace.deliveries;

import com.coffeetrace.deliveries.dto.DeliveryRequest;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final FarmerDeliveryRepository deliveryRepo;
    private final ActorRepository actorRepo;
    private final FarmRepository farmRepo;

    public FarmerDelivery createDelivery(DeliveryRequest req) {

        // Validate Farmer
        Actor farmer = actorRepo.findById(req.getFarmerId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid farmerId"));

        // Validate Farm
        Farm farm = farmRepo.findById(req.getFarmId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid farmId"));

        // Validate Washing Station
        Actor station = actorRepo.findById(req.getStationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid stationId"));

        // Create Delivery
        FarmerDelivery delivery = FarmerDelivery.builder()
                .farmer(farmer)
                .farm(farm)
                .washingStation(station)
                .cherryKg(req.getCherryKg())
                .receiptNumber(req.getReceiptNumber())
                .notes(req.getNotes())
                .deliveryTime(LocalDateTime.now())
                .build();

        return deliveryRepo.save(delivery);
    }
}

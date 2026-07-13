package com.coffeetrace.deliveries;

import com.coffeetrace.deliveries.dto.DeliveryRequest;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;
    private final ActorRepository actorRepo;
    private final FarmRepository farmRepo;
    private final FarmerDeliveryRepository deliveryRepo;



    @PostMapping
    public ResponseEntity<?> createDelivery(@RequestBody DeliveryRequest req) {

        if (req.getFarmerId() == null) return ResponseEntity.badRequest().body("farmerId is required");
        if (req.getFarmId() == null) return ResponseEntity.badRequest().body("farmId is required");
        if (req.getStationId() == null) return ResponseEntity.badRequest().body("stationId is required");
        if (req.getCherryKg() == null || req.getCherryKg() <= 0) return ResponseEntity.badRequest().body("cherryKg must be > 0");
        if (req.getReceiptNumber() == null || req.getReceiptNumber().isBlank()) return ResponseEntity.badRequest().body("receiptNumber is required");

        Actor farmer = actorRepo.findById(req.getFarmerId()).orElse(null);
        if (farmer == null) return ResponseEntity.badRequest().body("Invalid farmerId");

        Farm farm = farmRepo.findById(req.getFarmId()).orElse(null);
        if (farm == null) return ResponseEntity.badRequest().body("Invalid farmId");

        Actor station = actorRepo.findById(req.getStationId()).orElse(null);
        if (station == null) return ResponseEntity.badRequest().body("Invalid stationId");

        FarmerDelivery delivery = FarmerDelivery.builder()
                .farmer(farmer)
                .farm(farm)
                .washingStation(station)
                .cherryKg(req.getCherryKg())
                .receiptNumber(req.getReceiptNumber())
                .deliveryTime(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(deliveryRepo.save(delivery));
    }


    // ─────────────────────────────────────────────
    // GET DELIVERIES BY STATION
    // ─────────────────────────────────────────────
//    @GetMapping("/station/{stationId}")
//    public List<FarmerDelivery> getByStation(@PathVariable UUID stationId) {
//        return deliveryRepo.findByWashingStation_Id(stationId);
//    }
    @GetMapping("/station/{stationId}")
    public List<FarmerDeliveryView> getDeliveries(@PathVariable UUID stationId) {
        return deliveryRepo.findByWashingStation_Id(stationId)
                .stream()
                .map(FarmerDeliveryView::from)
                .toList();
    }
    @GetMapping("/qr/{qr}")
    public ResponseEntity<FarmerDelivery> getByQr(@PathVariable String qr) {
        FarmerDelivery delivery = deliveryRepo
                .findByReceiptNumber(qr)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Delivery not found for QR"
                        )
                );

        return ResponseEntity.ok(delivery);
    }

    @GetMapping
    public List<FarmerDeliveryView> listDeliveries(
            @RequestParam(required = false) UUID stationId,
            @RequestParam(required = false) Boolean unbatched
    ) {
        if (stationId != null && Boolean.TRUE.equals(unbatched)) {
            return deliveryRepo
                    .findByWashingStationIdAndBatchIsNull(stationId)
                    .stream()
                    .map(FarmerDeliveryView::from)
                    .toList();
        }

        return deliveryRepo.findAll()
                .stream()
                .map(FarmerDeliveryView::from)
                .toList();
    }


}

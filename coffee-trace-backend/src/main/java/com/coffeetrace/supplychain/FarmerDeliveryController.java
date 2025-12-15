//package com.coffeetrace.supplychain;
//
//
//
//import com.coffeetrace.farms.Farm;
//import com.coffeetrace.farms.FarmRepository;
//import com.coffeetrace.users.Actor;
//import com.coffeetrace.users.ActorRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/deliveries")
//@RequiredArgsConstructor
//public class FarmerDeliveryController {
//
//    private final FarmerDeliveryRepository deliveryRepo;
//    private final ActorRepository actorRepo;
//    private final FarmRepository farmRepo;
//
//    // -----------------------------------------------------------
//    // CREATE NEW DELIVERY
//    // -----------------------------------------------------------
////
////    @PostMapping
////    public ResponseEntity<?> createDelivery(@RequestBody DeliveryRequest req) {
////
////        Actor farmer = actorRepo.findById(req.getFarmerId())
////                .orElseThrow(() -> new RuntimeException("Farmer not found"));
////
////        Actor station = actorRepo.findById(req.getStationId())
////                .orElseThrow(() -> new RuntimeException("Washing station not found"));
////
////        Farm farm = farmRepo.findById(req.getFarmId())
////                .orElseThrow(() -> new RuntimeException("Farm not found"));
////
////        FarmerDelivery delivery = FarmerDelivery.builder()
////                .farmer(farmer)
////                .washingStation(station)
////                .farm(farm)
////                .deliveryTime(LocalDateTime.now())
////                .cherryKg(req.getCherryKg())
////                .receiptNumber(req.getReceiptNumber())
////                .build();
////
////        deliveryRepo.save(delivery);
////
////        return ResponseEntity.ok(delivery);
////    }
//    @PostMapping
//    public ResponseEntity<?> createDelivery(@RequestBody DeliveryRequest req) {
//
//        // Validate Farmer
//        if (!actorRepo.existsById(req.getFarmerId())) {
//            return ResponseEntity.badRequest().body("Invalid farmerId");
//        }
//
//        // Validate Farm
//        if (!farmRepo.existsById(req.getFarmId())) {
//            return ResponseEntity.badRequest().body("Invalid farmId");
//        }
//
//        // Validate Station
//        if (!actorRepo.existsById(req.getStationId())) {
//            return ResponseEntity.badRequest().body("Invalid stationId");
//        }
//
//        Actor farmer = actorRepo.findById(req.getFarmerId()).orElse(null);
//        Farm farm = farmRepo.findById(req.getFarmId()).orElse(null);
//        Actor station = actorRepo.findById(req.getStationId()).orElse(null);
//
//        FarmerDelivery delivery = FarmerDelivery.builder()
//                .farmer(farmer)
//                .farm(farm)
//                .washingStation(station)
//                .cherryKg(req.getCherryKg())
//                .receiptNumber(req.getReceiptNumber())
//                .deliveryTime(LocalDateTime.now())
//                .build();
//
//        deliveryRepo.save(delivery);
//
//        return ResponseEntity.ok(delivery);
//    }
//
//    // -----------------------------------------------------------
//    // GET SINGLE DELIVERY
//    // -----------------------------------------------------------
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getDelivery(@PathVariable UUID id) {
//        return deliveryRepo.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // -----------------------------------------------------------
//    // GET ALL DELIVERIES
//    // -----------------------------------------------------------
//    @GetMapping
//    public List<FarmerDelivery> getAll() {
//        return deliveryRepo.findAll();
//    }
//
//    // -----------------------------------------------------------
//    // GET DELIVERIES BY FARMER
//    // -----------------------------------------------------------
//    @GetMapping("/farmer/{farmerId}")
//    public List<FarmerDelivery> getByFarmer(@PathVariable UUID farmerId) {
//        return deliveryRepo.findByFarmerId(farmerId);
//    }
//
//    // -----------------------------------------------------------
//    // GET DELIVERIES BY FARM
//    // -----------------------------------------------------------
//    @GetMapping("/farm/{farmId}")
//    public List<FarmerDelivery> getByFarm(@PathVariable UUID farmId) {
//        return deliveryRepo.findByFarmId(farmId);
//    }
//
//    // -----------------------------------------------------------
//    // GET DELIVERIES BY BATCH
//    // -----------------------------------------------------------
//    @GetMapping("/batch/{batchId}")
//    public List<FarmerDelivery> getByBatch(@PathVariable UUID batchId) {
//        return deliveryRepo.findByBatchId(batchId);
//    }
//}

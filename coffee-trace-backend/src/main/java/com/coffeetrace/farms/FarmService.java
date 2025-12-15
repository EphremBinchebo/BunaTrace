package com.coffeetrace.farms;


import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

import java.util.List;
@Service
public class FarmService {

    private final FarmRepository farmRepository;
    private final ActorRepository actorRepository;

    public FarmService(FarmRepository farmRepository, ActorRepository actorRepository) {
        this.farmRepository = farmRepository;
        this.actorRepository = actorRepository;
    }

    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

//    public Farm createFarm(FarmRequest req) {
//
//        if (req.getFarmerId() == null) {
//            throw new IllegalArgumentException("Farmer ID is required");
//        }
//
//        Actor farmer = actorRepository.findById(req.getFarmerId())
//                .orElseThrow(() -> new RuntimeException("Farmer not found"));
//
////        Farm farm = Farm.builder()
////                .farmer(farmer)
////                .name(req.getName())
////                .areaHa(req.getAreaHa())
////                .elevationM(req.getElevationM())
////                .region(req.getRegion())
////                .zone(req.getZone())
////                .woreda(req.getWoreda())
////                .kebele(req.getKebele())
////                .build();
////
////        return farmRepository.save(farm);
////    }
        public Farm createFarm(FarmRequest req) {

            if (req.getFarmerId() == null) {
                throw new IllegalArgumentException("Farmer ID is required");
            }

            Actor farmer = actorRepository.findById(req.getFarmerId())
                    .orElseThrow(() -> new RuntimeException("Farmer not found"));

            Farm farm = Farm.builder()
                    .id(UUID.randomUUID())       // 🔥 CRITICAL FIX
                    .farmer(farmer)
                    .name(req.getName())
                    .areaHa(req.getAreaHa())
                    .elevationM(req.getElevationM())
                    .region(req.getRegion())
                    .zone(req.getZone())
                    .woreda(req.getWoreda())
                    .kebele(req.getKebele())
                    .build();

            return farmRepository.save(farm);
        }


        public List<Farm> getFarmsByFarmer(UUID farmerId) {
        return farmRepository.findFarmsByFarmerId(farmerId);
    }

    public Farm getFarmById(UUID id) {
        return farmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Farm not found"));
    }
}


//@Service
//public class FarmService {
//
//    private final FarmRepository farmRepository;
//    private final ActorRepository actorRepository;
//
//    public FarmService(FarmRepository farmRepository, ActorRepository actorRepository) {
//        this.farmRepository = farmRepository;
//        this.actorRepository = actorRepository;
//    }
//
//    public List<Farm> getAllFarms() {
//        return farmRepository.findAll();
//    }
//
//    public Farm createFarm(FarmRequest req) {
//
//        if (req.getFarmerId() == null) {
//            throw new IllegalArgumentException("Farmer ID is required");
//        }
//
//        Actor farmer = actorRepository.findById(req.getFarmerId())
//                .orElseThrow(() -> new RuntimeException("Farmer not found"));
//
//        Farm farm = Farm.builder()
//                .farmer(farmer)
//                .name(req.getName())
//                .areaHa(req.getAreaHa())
//                .elevationM(req.getElevationM())
//                .region(req.getRegion())
//                .zone(req.getZone())
//                .woreda(req.getWoreda())
//                .kebele(req.getKebele())
//                .build();
//
//        return farmRepository.save(farm);
//    }
//
//    public List<Farm> getFarmsByFarmer(UUID farmerId) {
//        return farmRepository.findFarmsByFarmerId(farmerId);
//    }
//
//    public Farm getFarmById(UUID id) {
//        return farmRepository.findById(UUID.fromString(id))
//                .orElseThrow(() -> new RuntimeException("Farm not found"));
//    }
//}


//@Service
//public class FarmService {
//
//    private final FarmRepository farmRepository;
//    private final ActorRepository actorRepository;
//
//    public List<Farm> getAllFarms() {
//        return farmRepository.findAll();
//    }
//
//    public Farm createFarm(FarmRequest req) {
//
//        // Validate farmerId presence
//        if (req.getFarmerId() == null) {
//            throw new IllegalArgumentException("Farmer ID is required");
//        }
//
//        // Load farmer actor
//        Actor farmer = actorRepository.findById(req.getFarmerId())
//                .orElseThrow(() -> new RuntimeException("Farmer not found"));
//
//        // Create Farm entity
//        Farm farm = Farm.builder()
//                .farmer(farmer)
//                .name(req.getName())
//                .areaHa(req.getAreaHa())
//                .geomGeoJson(req.getGeoJson())   // your GeoJSON string field
//                .woreda(req.getWoreda())
//                .kebele(req.getKebele())
//                .build();
//
//        return farmRepository.save(farm);
//    }
//
//    public List<Farm> getFarmsByFarmer(UUID farmerId) {
//        return farmRepository.findFarmsByFarmerId(farmerId);
//    }
//
//    public Farm getFarmById(UUID id) {
//        return farmRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Farm not found"));
//    }
//}


//@Service
//public class FarmService {
//
//    @Autowired
//    public FarmService(FarmRepository farmRepository, ActorRepository actorRepository) {
//        this.farmRepository = farmRepository;
//        this.actorRepository = actorRepository;
//    }
//
//    private final FarmRepository farmRepository;
//    private final ActorRepository actorRepository;
//
//
//    public List<Farm> getAllFarms() {
//        return farmRepository.findAll();
//    }
//
//    public Farm createFarm(FarmRequest req) {
//
////        if (req.getFarmerId() == null || req.getFarmerId().isBlank()) {
////            throw new IllegalArgumentException("Farmer ID is required");
////        }
////        if (farmerId == null) {
////            throw new IllegalArgumentException("Farmer ID is required");
////        }
//
//        if (farmerIdStr == null || farmerIdStr.isBlank()) {
//            throw new IllegalArgumentException("Farmer ID is required");
//        }
//
//        UUID farmerId = UUID.fromString(farmerIdStr);
//        Actor farmer = actorRepository.findById(req.getFarmerId())
//                .orElseThrow(() -> new RuntimeException("Farmer not found"));
//
//        Farm farm = Farm.builder()
//                .farmer(farmer)
//                .name(req.getName())
//                .areaHa(req.getAreaHa())
//                .geomGeoJson(req.getGeoJson())
//                .woreda(req.getWoreda())
//                .kebele(req.getKebele())
//                .build();
//
//        return farmRepository.save(farm);
//    }
//
//    public List<Farm> getFarmsByFarmer(String farmerId) {
//        return farmRepository.findFarmsByFarmerId(farmerId);
//    }
//
//    public Farm getFarmById(String id) {
//        return farmRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Farm not found"));
//    }
//}
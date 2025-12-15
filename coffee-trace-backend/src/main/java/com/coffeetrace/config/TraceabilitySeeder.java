package com.coffeetrace.config;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.deliveries.FarmerDeliveryRepository;
import com.coffeetrace.supplychain.*;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.qr.QrCode;
import com.coffeetrace.qr.QrCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TraceabilitySeeder {

    private final ActorRepository actorRepo;
    private final FarmRepository farmRepo;
    private final FarmerDeliveryRepository deliveryRepo;
    private final BatchRepository batchRepo;
    private final DryMillBatchRepository dryRepo;
    private final GreenLotRepository greenRepo;
    private final ExportLotRepository exportRepo;
    private final QrCodeRepository qrRepo;

    // ============================================================
    // RUN AFTER SPRING IS FULLY READY  ✅ FIXES TABLE-NOT-FOUND
    // ============================================================
    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void runSeeder() {

        System.out.println("\n🌱 Running Traceability Seeder...\n");

        // -----------------------------------------------
        // ACTORS
        // -----------------------------------------------
        Actor farmerSara = ensureActorWithId(
                uuid("3be4979f-a18a-4f56-b47b-e0b8cd280002"),
                "Farmer Sara", ActorType.FARMER,
                "SNNPR", "Sidama", "Dale", "02",
                6.23456, 38.45678
        );

        Actor farmerAbe = ensureActorWithId(
                uuid("9d3e5a2a-5625-47e6-9e18-0dd0b6428001"),
                "Farmer Abe", ActorType.FARMER,
                "Oromia", "Guji", "Hambela", "03",
                6.12345, 38.98765
        );

        Actor washingStation = ensureActorWithId(
                uuid("49c911bb-c859-4f8e-aead-cfbc33e10001"),
                "Hambela Washing Station", ActorType.WASHING_STATION,
                "Oromia", "Guji", "Hambela", "01",
                6.34567, 38.56789
        );

        Actor dryMill = ensureActorWithId(
                uuid("4f9b322c-18a9-45ae-b35a-e3ab004d1001"),
                "Addis Dry Mill", ActorType.DRYING_STATION,
                "Addis Ababa", "Nifas Silk", "AA01", "01",
                8.9806, 38.7578
        );

        Actor exporter = ensureActorWithId(
                uuid("7d4cd27c-84f9-47ac-aef1-889bc71f2001"),
                "Guji Prime Exporters", ActorType.EXPORTER,
                "Addis Ababa", "Bole", "AA02", "01",
                9.01234, 38.78901
        );

        // -----------------------------------------------
        // FARMS
        // -----------------------------------------------
        Farm farmA = ensureFarmWithId(
                uuid("7261d51e-704d-43ef-9b64-d2c81d0a2002"),
                farmerSara, "Sara Farm",
                samplePolygon2(), 1.8, 1850, "74158"
        );

        Farm farmB = ensureFarmWithId(
                uuid("8261d51e-704d-43ef-9b64-d2c81d0a2003"),
                farmerAbe, "Abe Farm",
                samplePolygon1(), 2.4, 1950, "74110"
        );

        // -----------------------------------------------
        // FARMER DELIVERIES
        // -----------------------------------------------
        FarmerDelivery d1 = ensureDelivery(
                farmerAbe, washingStation, farmB,
                120.0, "DEL-ABE-001", LocalDateTime.now().minusDays(15)
        );

        FarmerDelivery d2 = ensureDelivery(
                farmerSara, washingStation, farmA,
                95.0, "DEL-SARA-001", LocalDateTime.now().minusDays(14)
        );

        // -----------------------------------------------
        // BATCHES
        // -----------------------------------------------
//        Batch batch = batchRepo.findByBatchCode("WS-GUJI-2025-009")
//                .orElseGet(() -> batchRepo.save(
//                        Batch.builder()
//                                .batchCode("WS-GUJI-2025-009")
//                                .station(washingStation)
//                                .processType("WASHED")
//                                .fermentationStart(LocalDate.now().minusDays(14))
//                                .fermentationEnd(LocalDate.now().minusDays(13))
//                                .dryingStart(LocalDate.now().minusDays(13))
//                                .dryingEnd(LocalDate.now().minusDays(7).atStartOfDay())
//                                .totalCherryKg(215.0)
//                                .parchmentKg(85.0)
//                                .status("CREATED")
//                                .qrCode("QR-WS-GUJI-2025-009")
//                                .build()
//                ));
//
//        d1.setBatch(batch);
//        d2.setBatch(batch);
//        deliveryRepo.saveAll(List.of(d1, d2));
        Batch batch = batchRepo.findByBatchCode("WS-GUJI-2025-009")
                .orElseGet(() -> batchRepo.save(
                        Batch.builder()
                                .batchCode("WS-GUJI-2025-009")
                                .station(washingStation)
                                .processType("WASHED")
                                .fermentationStart(LocalDate.now().minusDays(14))
                                .fermentationEnd(LocalDate.now().minusDays(13))
                                .dryingStart(LocalDate.now().minusDays(13))
                                .dryingEnd(LocalDate.now().minusDays(7))   // ✅ FIXED (LocalDate only)
                                .totalCherryKg(215.0)
                                .parchmentKg(85.0)
                                .status("CREATED")
                                .qrCode("QR-WS-GUJI-2025-009")
                                .build()
                ));

        d1.setBatch(batch);
        d2.setBatch(batch);

        deliveryRepo.saveAll(List.of(d1, d2));


        // -----------------------------------------------
        // DRY MILL
        // -----------------------------------------------
        DryMillBatch dryBatch = dryRepo.save(
                DryMillBatch.builder()
                        .dryMill(dryMill)
                        .parchmentBatch(batch)
                        .millingDate(LocalDate.now().minusDays(5))
                        .inputParchmentKg(85.0)
                        .outputGreenKg(68.0)
                        .moisturePercent(11.5)
                        .defectCount(3)
                        .screenSize(16)
                        .grade("G1")
                        .build()
        );

        // -----------------------------------------------
        // GREEN LOT
        // -----------------------------------------------
        GreenLot green = greenRepo.findByLotCode("GUJI-2025-0009")
                .orElseGet(() -> greenRepo.save(
                        GreenLot.builder()
                                .lotCode("GUJI-2025-0009")
                                .totalGreenKg(68.0)
                                .grade("G1")
                                .processingType("WASHED")
                                .build()
                ));

        if (!green.getMillBatches().contains(dryBatch)) {
            green.getMillBatches().add(dryBatch);
            green = greenRepo.save(green);
        }

        // -----------------------------------------------
        // EXPORT LOT
        // -----------------------------------------------
        GreenLot finalGreen = green;
        ExportLot exportLot = exportRepo.findByExportCode("EXP-GUJI-2025-0009")
                .orElseGet(() -> exportRepo.save(
                        ExportLot.builder()
                                .greenLot(finalGreen)
                                .exporter(exporter)
                                .exportCode("EXP-GUJI-2025-0009")
                                .bagCount(10)
                                .bagWeightKg(60)
                                .ecxCode("ECX123456")
                                .exportLicense("EXP-ET-000999")
                                .packingDate(LocalDate.now().minusDays(3))
                                .build()
                ));

        // -----------------------------------------------
        // QR CODE
        // -----------------------------------------------
        String token = "QR-" + exportLot.getExportCode();

        qrRepo.findByUrlToken(token).orElseGet(() ->
                qrRepo.save(
                        QrCode.builder()
                                .exportLot(exportLot)
                                .urlToken(token)
                                .createdAt(LocalDateTime.now())
                                .build()
                ));

        System.out.println("\n✅ Traceability Seeder completed successfully!\n");
    }

    // ============================================================
    // HELPERS
    // ============================================================

    private UUID uuid(String id) {
        return UUID.fromString(id);
    }

    private Actor ensureActorWithId(UUID id, String name, ActorType type,
                                    String region, String zone, String woreda, String kebele,
                                    Double lat, Double lon) {

        return actorRepo.findById(id).orElseGet(() -> {
            Actor a = new Actor();
            a.setId(id);
            a.setName(name);
            a.setType(type);
            a.setRegion(region);
            a.setZone(zone);
            a.setWoreda(woreda);
            a.setKebele(kebele);
            a.setLatitude(lat);
            a.setLongitude(lon);
            return actorRepo.save(a);
        });
    }

    private Farm ensureFarmWithId(UUID id, Actor farmer, String name,
                                  String geoJson, double areaHa, int elevation, String variety) {

        return farmRepo.findById(id).orElseGet(() -> {
            Farm f = new Farm();
            f.setId(id);
            f.setFarmer(farmer);
            f.setName(name);
            f.setGeomGeoJson(geoJson);      // FIX
            f.setAreaHa(areaHa);
            f.setElevationM(elevation);
            f.setVariety(variety);
            return farmRepo.save(f);
        });
    }

    private FarmerDelivery ensureDelivery(Actor farmer, Actor station, Farm farm,
                                          Double kg, String receipt, LocalDateTime time) {

        return deliveryRepo.save(
                FarmerDelivery.builder()
                        .farmer(farmer)
                        .washingStation(station)
                        .farm(farm)
                        .deliveryTime(time)
                        .cherryKg(kg)
                        .receiptNumber(receipt)
                        .build()
        );
    }

    private String samplePolygon1() {
        return """
            {"type":"Polygon","coordinates":[[[38.72,9.03],[38.721,9.031],[38.722,9.029],[38.72,9.03]]]}
        """;
    }

    private String samplePolygon2() {
        return """
            {"type":"Polygon","coordinates":[[[38.70,8.999],[38.701,9.000],[38.699,8.998],[38.70,8.999]]]}
        """;
    }
}


//import com.coffeetrace.batch.Batch;
//import com.coffeetrace.batch.BatchRepository;
//import com.coffeetrace.supplychain.*;
//import com.coffeetrace.users.Actor;
//import com.coffeetrace.users.ActorRepository;
//import com.coffeetrace.users.ActorType;
//import com.coffeetrace.farms.Farm;
//import com.coffeetrace.farms.FarmRepository;
//import com.coffeetrace.qr.QrCode;
//import com.coffeetrace.qr.QrCodeRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.UUID;
//
//@Component
//@RequiredArgsConstructor
//@Transactional
//public class TraceabilitySeeder implements CommandLineRunner {
//
//    private final ActorRepository actorRepo;
//    private final FarmRepository farmRepo;
//    private final FarmerDeliveryRepository deliveryRepo;
//    private final BatchRepository batchRepo;
//    private final DryMillBatchRepository dryRepo;
//    private final GreenLotRepository greenRepo;
//    private final ExportLotRepository exportRepo;
//    private final QrCodeRepository qrRepo;
//
//    @Override
//    public void run(String... args) {
//
//        System.out.println("\n🌱 Running Traceability Seeder...\n");
//
//        // ----------------------------------------------------------------------
//        // ✔️ ACTORS (UUIDs synced with frontend mock.const.ts)
//        // ----------------------------------------------------------------------
//        Actor farmerSara = ensureActorWithId(
//                UUID.fromString("3be4979f-a18a-4f56-b47b-e0b8cd280002"),
//                "Farmer Sara", ActorType.FARMER,
//                "SNNPR", "Sidama", "Dale", "02",
//                6.23456, 38.45678
//        );
//
//        Actor farmerAbe = ensureActorWithId(
//                UUID.fromString("9d3e5a2a-5625-47e6-9e18-0dd0b6428001"),
//                "Farmer Abe", ActorType.FARMER,
//                "Oromia", "Guji", "Hambela", "03",
//                6.12345, 38.98765
//        );
//
//        Actor washingStation = ensureActorWithId(
//                UUID.fromString("49c911bb-c859-4f8e-aead-cfbc33e10001"),
//                "Hambela Washing Station", ActorType.WASHING_STATION,
//                "Oromia", "Guji", "Hambela", "01",
//                6.34567, 38.56789
//        );
//
//        Actor dryMill = ensureActorWithId(
//                UUID.fromString("4f9b322c-18a9-45ae-b35a-e3ab004d1001"),
//                "Addis Dry Mill", ActorType.DRYING_STATION,
//                "Addis Ababa", "Nifas Silk", "AA01", "01",
//                8.9806, 38.7578
//        );
//
//        Actor exporter = ensureActorWithId(
//                UUID.fromString("7d4cd27c-84f9-47ac-aef1-889bc71f2001"),
//                "Guji Prime Exporters", ActorType.EXPORTER,
//                "Addis Ababa", "Bole", "AA02", "01",
//                9.01234, 38.78901
//        );
//
//        // ----------------------------------------------------------------------
//        // ✔️ FARMS (UUIDs synced with frontend)
//        // ----------------------------------------------------------------------
//        Farm farmA = ensureFarmWithId(
//                UUID.fromString("7261d51e-704d-43ef-9b64-d2c81d0a2002"),
//                farmerSara, "Sara Farm",
//                samplePolygon2(), 1.8, 1850, "74158"
//        );
//
//        Farm farmB = ensureFarmWithId(
//                UUID.fromString("8261d51e-704d-43ef-9b64-d2c81d0a2003"),
//                farmerAbe, "Abe Farm",
//                samplePolygon1(), 2.4, 1950, "74110"
//        );
//
//        // ----------------------------------------------------------------------
//        // ✔️ SEED DELIVERIES
//        // ----------------------------------------------------------------------
//        FarmerDelivery d1 = ensureDelivery(
//                farmerAbe, washingStation, farmB,
//                120.0, "DEL-ABE-001", LocalDateTime.now().minusDays(15)
//        );
//
//        FarmerDelivery d2 = ensureDelivery(
//                farmerSara, washingStation, farmA,
//                95.0, "DEL-SARA-001", LocalDateTime.now().minusDays(14)
//        );
//
//        // ----------------------------------------------------------------------
//        // ✔️ BATCH
//        // ----------------------------------------------------------------------
//        Batch batch = batchRepo.findByBatchCode("WS-GUJI-2025-009")
//                .orElseGet(() -> batchRepo.save(
//                        Batch.builder()
//                                .batchCode("WS-GUJI-2025-009")
//                                .station(washingStation)
//                                .processType("WASHED")
//                                .fermentationStart(LocalDate.now().minusDays(14))
//                                .fermentationEnd(LocalDate.now().minusDays(13))
//                                .dryingStart(LocalDate.now().minusDays(13))
//                                .dryingEnd(LocalDate.now().minusDays(7).atStartOfDay())
//                                .totalCherryKg(215.0)
//                                .parchmentKg(85.0)
//                                .status("CREATED")
//                                .qrCode("QR-WS-GUJI-2025-009")
//                                .build()
//                ));
//
//        d1.setBatch(batch);
//        d2.setBatch(batch);
//        deliveryRepo.saveAll(List.of(d1, d2));
//
//        // ----------------------------------------------------------------------
//        // ✔️ DRY MILL BATCH
//        // ----------------------------------------------------------------------
//        DryMillBatch dryBatch = dryRepo.save(
//                DryMillBatch.builder()
//                        .dryMill(dryMill)
//                        .parchmentBatch(batch)
//                        .millingDate(LocalDate.now().minusDays(5))
//                        .inputParchmentKg(85.0)
//                        .outputGreenKg(68.0)
//                        .moisturePercent(11.5)
//                        .defectCount(3)
//                        .screenSize(16)
//                        .grade("G1")
//                        .build()
//        );
//
//        // ----------------------------------------------------------------------
//        // ✔️ GREEN LOT
//        // ----------------------------------------------------------------------
//        GreenLot green = greenRepo.findByLotCode("GUJI-2025-0009")
//                .orElseGet(() -> greenRepo.save(
//                        GreenLot.builder()
//                                .lotCode("GUJI-2025-0009")
//                                .totalGreenKg(68.0)
//                                .grade("G1")
//                                .processingType("WASHED")
//                                .build()
//                ));
//
//        if (!green.getMillBatches().contains(dryBatch)) {
//            green.getMillBatches().add(dryBatch);
//            green = greenRepo.save(green);
//        }
//
//        // ----------------------------------------------------------------------
//        // ✔️ EXPORT LOT
//        // ----------------------------------------------------------------------
//        GreenLot finalGreen = green;
//        ExportLot exportLot = exportRepo.findByExportCode("EXP-GUJI-2025-0009")
//                .orElseGet(() -> exportRepo.save(
//                        ExportLot.builder()
//                                .greenLot(finalGreen)
//                                .exporter(exporter)
//                                .exportCode("EXP-GUJI-2025-0009")
//                                .bagCount(10)
//                                .bagWeightKg(60)
//                                .ecxCode("ECX123456")
//                                .exportLicense("EXP-ET-000999")
//                                .packingDate(LocalDate.now().minusDays(3))
//                                .build()
//                ));
//
//        // ----------------------------------------------------------------------
//        // ✔️ QR CODE
//        // ----------------------------------------------------------------------
//        String token = "QR-" + exportLot.getExportCode();
//        qrRepo.findByUrlToken(token).orElseGet(() ->
//                qrRepo.save(
//                        QrCode.builder()
//                                .exportLot(exportLot)
//                                .urlToken(token)
//                                .createdAt(LocalDateTime.now())
//                                .build()
//                ));
//
//        System.out.println("\n✅ Seeder completed successfully!\n");
//    }
//
//    // =====================================================================================
//    // HELPERS
//    // =====================================================================================
//
//    private Actor ensureActorWithId(UUID id, String name, ActorType type,
//                                    String region, String zone, String woreda, String kebele,
//                                    Double lat, Double lon) {
//
//        return actorRepo.findById(id).orElseGet(() -> {
//            Actor a = new Actor();
//            a.setId(id);   // CRITICAL
//            a.setName(name);
//            a.setType(type);
//            a.setRegion(region);
//            a.setZone(zone);
//            a.setWoreda(woreda);
//            a.setKebele(kebele);
//            a.setLatitude(lat);
//            a.setLongitude(lon);
//            return actorRepo.save(a);
//        });
//    }
//
////    private Farm ensureFarmWithId(UUID id, Actor farmer, String name,
////                                  String geoJson, double areaHa, int elevation, String variety) {
////
////        return farmRepo.findById(id).orElseGet(() -> {
////            Farm f = new Farm();
////            f.setId(id);   // CRITICAL
////            f.setFarmer(farmer);
////            f.setName(name);
////            f.setRegion(geoJson);
////            f.setAreaHa(areaHa);
////            f.setElevationM(elevation);
////            f.setVariety(variety);
////            return farmRepo.save(f);
////        });
////    }
//private Farm ensureFarmWithId(
//        UUID id,
//        Actor farmer,
//        String name,
//        String geoJson,
//        double areaHa,
//        int elevation,
//        String variety
//) {
//    return farmRepo.findById(id).orElseGet(() -> {
//        Farm f = new Farm();
//        f.setId(id);  // 🔥 CRITICAL: must set manually
//        f.setFarmer(farmer);
//        f.setName(name);
//        f.setRegion(geoJson);
//        f.setAreaHa(areaHa);
//        f.setElevationM(elevation);
//        f.setVariety(variety);
//        return farmRepo.save(f);
//    });
//}
//
//    Farm farmA = ensureFarmWithId(
//            UUID.fromString("7261d51e-704d-43ef-9b64-d2c81d0a2002"),
//            farmer2,
//            "Sara Farm",
//            samplePolygon2(),
//            1.8,
//            1850,
//            "74158"
//    );
//
//    private FarmerDelivery ensureDelivery(Actor farmer, Actor station, Farm farm,
//                                          Double kg, String receipt, LocalDateTime time) {
//        return deliveryRepo.save(
//                FarmerDelivery.builder()
//                        .farmer(farmer)
//                        .washingStation(station)
//                        .farm(farm)
//                        .deliveryTime(time)
//                        .cherryKg(kg)
//                        .receiptNumber(receipt)
//                        .build()
//        );
//    }
//
//    private String samplePolygon1() {
//        return """
//            {"type":"Polygon","coordinates":[[[38.72,9.03],[38.721,9.031],[38.722,9.029],[38.72,9.03]]]}
//        """;
//    }
//
//    private String samplePolygon2() {
//        return """
//            {"type":"Polygon","coordinates":[[[38.70,8.999],[38.701,9.000],[38.699,8.998],[38.70,8.999]]]}
//        """;
//    }
//}

//import com.coffeetrace.batch.BatchRepository;
//import com.coffeetrace.farms.Farm;
//import com.coffeetrace.farms.FarmRepository;
//import com.coffeetrace.qr.QrCodeRepository;
//import com.coffeetrace.supplychain.*;
//import com.coffeetrace.users.Actor;
//import com.coffeetrace.users.ActorRepository;
//import com.coffeetrace.users.ActorType;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDateTime;
//import java.util.UUID;
//
//@Component
//@RequiredArgsConstructor
//@Transactional
//public class TraceabilitySeeder implements CommandLineRunner {
//
//    private final ActorRepository actorRepo;
//    private final FarmRepository farmRepo;
//    private final FarmerDeliveryRepository deliveryRepo;
//    private final BatchRepository batchRepo;
//    private final DryMillBatchRepository dryRepo;
//    private final GreenLotRepository greenRepo;
//    private final ExportLotRepository exportRepo;
//    private final ShipmentRepository shipmentRepo;
//    private final QrCodeRepository qrRepo;
//
//    @Override
//    public void run(String... args) {
//
//        System.out.println("🔥 Running Seeder...");
//
//        // ---------------------------------------------------
//        // FARMERS (MATCH FRONTEND UUIDs)
//        // ---------------------------------------------------
//
//        UUID abeId = UUID.fromString("9d3e5a2a-5625-47e6-9e18-0dd0b6428001");
//        UUID saraId = UUID.fromString("3be4979f-a18a-4f56-b47b-e0b8cd280002");
//
//        Actor farmerAbe = ensureActorWithId(
//                abeId, "Farmer Abe", ActorType.FARMER,
//                "Oromia", "Guji", "Hambela", "03", 6.12, 38.98
//        );
//
//        Actor farmerSara = ensureActorWithId(
//                saraId, "Farmer Sara", ActorType.FARMER,
//                "SNNPR", "Sidama", "Dale", "02", 6.23, 38.45
//        );
//
//        // ---------------------------------------------------
//        // WASHING STATION (MATCH FRONTEND UUID)
//        // ---------------------------------------------------
//        UUID washingId = UUID.fromString("8f2b0acd-d237-4a52-a02d-99a6f65d0002");
//
//        Actor washingStation = ensureActorWithId(
//                washingId, "Yirgacheffe WS", ActorType.WASHING_STATION,
//                "SNNPR", "Gedeo", "Yirgacheffe", "01", 6.15, 38.25
//        );
//
//        // ---------------------------------------------------
//        // FARMS (MATCH FRONTEND UUID)
//        // ---------------------------------------------------
//        UUID saraFarmId = UUID.fromString("7261d51e-704d-43ef-9b64-d2c81d0a2002");
//
//        Farm saraFarm = ensureFarmWithId(
//                saraFarmId, farmerSara, "Sara Farm",
//                samplePolygon2(), 1.8, 1850, "74158"
//        );
//
//        Farm abeFarm = ensureFarm(
//                farmerAbe, "Abe Farm",
//                samplePolygon1(), 2.4, 1950, "74110"
//        );
//
//        // ---------------------------------------------------
//        // SAMPLE DELIVERIES
//        // ---------------------------------------------------
//        FarmerDelivery del1 = deliveryRepo.save(
//                FarmerDelivery.builder()
//                        .farmer(farmerAbe)
//                        .washingStation(washingStation)
//                        .farm(abeFarm)
//                        .deliveryTime(LocalDateTime.now().minusDays(10))
//                        .cherryKg(120.0)
//                        .receiptNumber("DEL-ABE-001")
//                        .build()
//        );
//
//        FarmerDelivery del2 = deliveryRepo.save(
//                FarmerDelivery.builder()
//                        .farmer(farmerSara)
//                        .washingStation(washingStation)
//                        .farm(saraFarm)
//                        .deliveryTime(LocalDateTime.now().minusDays(5))
//                        .cherryKg(95.0)
//                        .receiptNumber("DEL-SARA-001")
//                        .build()
//        );
//
//        System.out.println("✅ Farmer, Farms, Deliveries seeded!");
//    }
//
//    // -----------------------------------------------------
//    // HELPERS
//    // -----------------------------------------------------
//
////    private Actor ensureActorWithId(UUID id, String name, ActorType type,
////                                    String region, String zone, String woreda, String kebele,
////                                    Double lat, Double lon) {
////
////        return actorRepo.findById(id).orElseGet(() -> {
////            Actor a = new Actor();
////            a.setId(id);
////            a.setName(name);
////            a.setType(type);
////            a.setRegion(region);
////            a.setZone(zone);
////            a.setWoreda(woreda);
////            a.setKebele(kebele);
////            a.setLatitude(lat);
////            a.setLongitude(lon);
////            return actorRepo.save(a);
////        });
////    }
//private Actor ensureActorWithId(
//        UUID id,
//        String name,
//        ActorType type,
//        String region,
//        String zone,
//        String woreda,
//        String kebele,
//        Double lat,
//        Double lon
//) {
//    return actorRepo.findById(id).orElseGet(() -> {
//        Actor a = new Actor();
//        a.setId(id);                   // 🔥 CRITICAL — Without this Hibernate generates a new ID!
//        a.setName(name);
//        a.setType(type);
//        a.setRegion(region);
//        a.setZone(zone);
//        a.setWoreda(woreda);
//        a.setKebele(kebele);
//        a.setLatitude(lat);
//        a.setLongitude(lon);
//        return actorRepo.save(a);
//    });
//}
//
//    private Farm ensureFarmWithId(UUID id, Actor farmer, String name,
//                                  String geoJson, double areaHa, int elevation, String variety) {
//
//        return farmRepo.findById(id).orElseGet(() ->
//                farmRepo.save(Farm.builder()
//                        .id(id)
//                        .farmer(farmer)
//                        .name(name)
//                        .region(geoJson)
//                        .areaHa(areaHa)
//                        .elevationM(elevation)
//                        .variety(variety)
//                        .build())
//        );
//    }
//
//    private Farm ensureFarm(Actor farmer, String name, String geoJson,
//                            double areaHa, int elevation, String variety) {
//
//        return farmRepo.findFarmsByFarmerId(farmer.getId()).stream()
//                .filter(f -> f.getName().equalsIgnoreCase(name))
//                .findFirst()
//                .orElseGet(() -> farmRepo.save(
//                        Farm.builder()
//                                .farmer(farmer)
//                                .name(name)
//                                .region(geoJson)
//                                .areaHa(areaHa)
//                                .elevationM(elevation)
//                                .variety(variety)
//                                .build()
//                ));
//    }
//
//    private String samplePolygon1() {
//        return """
//                {"type":"Polygon","coordinates":[[[38.72,9.03],[38.721,9.031],[38.722,9.029],[38.72,9.03]]]}
//                """;
//    }
//
//    private String samplePolygon2() {
//        return """
//                {"type":"Polygon","coordinates":[[[38.70,8.999],[38.701,9.000],[38.699,8.998],[38.70,8.999]]]}
//                """;
//    }
//}


//import com.coffeetrace.batch.Batch;
//import com.coffeetrace.batch.BatchRepository;
//import com.coffeetrace.farms.Farm;
//import com.coffeetrace.farms.FarmRepository;
//import com.coffeetrace.supplychain.*;
//import com.coffeetrace.qr.*;
//import com.coffeetrace.users.Actor;
//import com.coffeetrace.users.ActorRepository;
//import com.coffeetrace.users.ActorType;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.boot.CommandLineRunner;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//@Transactional
//public class TraceabilitySeeder implements CommandLineRunner {
//
//    private final ActorRepository actorRepo;
//    private final FarmRepository farmRepo;
//    private final FarmerDeliveryRepository deliveryRepo;
//    private final BatchRepository batchRepo;
//    private final DryMillBatchRepository dryRepo;
//    private final GreenLotRepository greenRepo;
//    private final ExportLotRepository exportRepo;
//    private final ShipmentRepository shipmentRepo;
//    private final QrCodeRepository qrRepo;
//
//    @Override
//    public void run(String... args) {
//
//        System.out.println("----- STARTING TRACEABILITY SEEDER -----");
//
//        // ---------------- ACTORS ----------------
//        Actor farmer1 = ensureActor("Farmer Abe", ActorType.FARMER,
//                "Oromia", "Guji", "Hambela", "03", 6.12345, 38.98765);
//
//        Actor farmer2 = ensureActor("Farmer Sara", ActorType.FARMER,
//                "SNNPR", "Sidama", "Dale", "02", 6.23456, 38.45678);
//
//        Actor washing = ensureActor("Hambela Washing Station", ActorType.WASHING_STATION,
//                "Oromia", "Guji", "Hambela", "01", 6.34567, 38.56789);
//
//        Actor dryMill = ensureActor("Addis Dry Mill", ActorType.DRYING_STATION,
//                "Addis Ababa", "Nifas Silk", "AA01", "01", 8.9806, 38.7578);
//
//        Actor exporter = ensureActor("Guji Prime Exporters", ActorType.EXPORTER,
//                "Addis Ababa", "Bole", "AA02", "01", 9.01234, 38.78901);
//
//
//        // ---------------- FARMS ----------------
//        Farm farmA = ensureFarm(farmer1, "Abe Farm", samplePolygon1(), 2.4, 1950, "74110");
//        Farm farmB = ensureFarm(farmer2, "Sara Farm", samplePolygon2(), 1.8, 1850, "74158");
//
//
//        // ---------------- FARMER DELIVERIES ----------------
//        FarmerDelivery d1 = deliveryRepo.save(FarmerDelivery.builder()
//                .farmer(farmer1)
//                .washingStation(washing)
//                .farm(farmA)
//                .deliveryTime(LocalDateTime.now().minusDays(15))
//                .cherryKg(120.0)
//                .receiptNumber("DEL-ABE-001")
//                .build());
//
//        FarmerDelivery d2 = deliveryRepo.save(FarmerDelivery.builder()
//                .farmer(farmer2)
//                .washingStation(washing)
//                .farm(farmB)
//                .deliveryTime(LocalDateTime.now().minusDays(14))
//                .cherryKg(95.0)
//                .receiptNumber("DEL-SARA-001")
//                .build());
//
//
//        // ---------------- BATCH ----------------
//        Batch batch = batchRepo.findByBatchCode("WS-GUJI-2025-009")
//                .orElseGet(() -> batchRepo.save(
//                        Batch.builder()
//                                .batchCode("WS-GUJI-2025-009")
//                                .station(washing)
//                                .processType("WASHED")
//                                .fermentationStart(LocalDate.now().minusDays(14))
//                                .fermentationEnd(LocalDate.now().minusDays(13))
//                                .dryingStart(LocalDate.now().minusDays(13))
//                                .dryingEnd(LocalDate.now().minusDays(7))
//                                .totalCherryKg(215.0)
//                                .parchmentKg(85.0)
//                                .status("CREATED")
//                                .qrCode("QR-WS-GUJI-2025-009")
//                                .build()
//                ));
//
//        d1.setBatch(batch);
//        d2.setBatch(batch);
//        deliveryRepo.saveAll(List.of(d1, d2));
//
//
//        // ---------------- DRY MILL BATCH ----------------
//        DryMillBatch dryBatch = dryRepo.save(
//                DryMillBatch.builder()
//                        .dryMill(dryMill)
//                        .parchmentBatch(batch)
//                        .millingDate(LocalDate.now().minusDays(5))
//                        .inputParchmentKg(85.0)
//                        .outputGreenKg(68.0)
//                        .moisturePercent(11.5)
//                        .defectCount(3)
//                        .screenSize(16)
//                        .grade("G1")
//                        .build()
//        );
//
//
//        // ---------------- GREEN LOT (NO LAZY ERROR) ----------------
//        GreenLot green = ensureGreenLot("GUJI-2025-0009", 68.0, "G1", "WASHED");
//
//        // initialize lazy collection safely
//        green.getMillBatches().size();
//
//        if (!green.getMillBatches().contains(dryBatch)) {
//            green.getMillBatches().add(dryBatch);
//            green = greenRepo.save(green);
//        }
//
//
//        // ---------------- EXPORT LOT ----------------
////        ExportLot exportLot = exportRepo.save(
////                ExportLot.builder()
////                        .greenLot(green)
////                        .exporter(exporter)
////                        .exportCode("EXP-GUJI-2025-0009")
////                        .bagCount(10)
////                        .bagWeightKg(60)
////                        .ecxCode("ECX123456")
////                        .exportLicense("EXP-ET-000999")
////                        .packingDate(LocalDate.now().minusDays(3))
////                        .build()
////        );
//        ExportLot exportLot = ensureExportLot(
//                "EXP-GUJI-2025-0009",
//                green,
//                exporter,
//                10,
//                60,
//                "ECX123456",
//                "EXP-ET-000999",
//                LocalDate.now().minusDays(3)
//        );
//
//
//        // ---------------- QR CODE ----------------
//        qrRepo.save(
//                QrCode.builder()
//                        .exportLot(exportLot)
//                        .urlToken("QR-" + exportLot.getExportCode())
//                        .createdAt(LocalDateTime.now())
//                        .build()
//        );
//
//        System.out.println("✅ Seeder completed successfully!");
//    }
//
//
//
//    // ==============================================================
//    // HELPERS
//    // ==============================================================
//
//    private Actor ensureActor(String name, ActorType type,
//                              String region, String zone, String woreda,
//                              String kebele, Double lat, Double lon) {
//
//        return actorRepo.findByType(type).stream()
//                .filter(a -> a.getName().equalsIgnoreCase(name))
//                .findFirst()
//                .orElseGet(() -> actorRepo.save(
//                        Actor.builder()
//                                .name(name)
//                                .type(type)
//                                .region(region)
//                                .zone(zone)
//                                .woreda(woreda)
//                                .kebele(kebele)
//                                .latitude(lat)
//                                .longitude(lon)
//                                .build()
//                ));
//    }
//
//
//    private Farm ensureFarm(Actor farmer, String name, String geoJson,
//                            double areaHa, int elevation, String variety) {
//
//        return farmRepo.findByFarmerId(farmer.getId()).stream()
//                .filter(f -> name.equals(f.getName()))
//                .findFirst()
//                .orElseGet(() -> farmRepo.save(
//                        Farm.builder()
//                                .farmer(farmer)
//                                .name(name)
//                                .geomGeoJson(geoJson)
//                                .areaHa(areaHa)
//                                .elevationMasl(elevation)
//                                .variety(variety)
//                                .build()
//                ));
//    }
//
//
//    private GreenLot ensureGreenLot(String code, double kg, String grade, String type) {
//        return greenRepo.findByLotCode(code)
//                .orElseGet(() -> greenRepo.save(
//                        GreenLot.builder()
//                                .lotCode(code)
//                                .totalGreenKg(kg)
//                                .grade(grade)
//                                .processingType(type)
//                                .build()
//                ));
//    }
//    private ExportLot ensureExportLot(String code,
//                                      GreenLot green,
//                                      Actor exporter,
//                                      int bagCount,
//                                      int bagWeightKg,
//                                      String ecxCode,
//                                      String exportLicense,
//                                      LocalDate packingDate) {
//
//        return exportRepo.findByExportCode(code)
//                .orElseGet(() -> exportRepo.save(
//                        ExportLot.builder()
//                                .exportCode(code)
//                                .greenLot(green)
//                                .exporter(exporter)
//                                .bagCount(bagCount)
//                                .bagWeightKg(bagWeightKg)
//                                .ecxCode(ecxCode)
//                                .exportLicense(exportLicense)
//                                .packingDate(packingDate)
//                                .build()
//                ));
//    }
//
//
//    private String samplePolygon1() {
//        return """
//                {
//                  "type": "Polygon",
//                  "coordinates": [
//                    [
//                      [38.72, 9.03],
//                      [38.721, 9.031],
//                      [38.722, 9.029],
//                      [38.72, 9.03]
//                    ]
//                  ]
//                }
//                """;
//    }
//
//    private String samplePolygon2() {
//        return """
//                {
//                  "type": "Polygon",
//                  "coordinates": [
//                    [
//                      [38.70, 8.999],
//                      [38.701, 9.000],
//                      [38.699, 8.998],
//                      [38.70, 8.999]
//                    ]
//                  ]
//                }
//                """;
//    }
//}
//@Component
//@RequiredArgsConstructor
//@Transactional   // 🔥 FIX: keeps Hibernate session open for lazy collections
//public class TraceabilitySeeder implements CommandLineRunner {
//
//    private final ActorRepository actorRepo;
//    private final FarmRepository farmRepo;
//    private final FarmerDeliveryRepository deliveryRepo;
//    private final BatchRepository batchRepo;
//    private final DryMillBatchRepository dryRepo;
//    private final GreenLotRepository greenRepo;
//    private final ExportLotRepository exportRepo;
//    private final ShipmentRepository shipmentRepo;
//    private final QrCodeRepository qrRepo;
//
//
//    @Override
//    public void run(String... args) {
//
//        // ---- ACTORS ----
//        Actor farmer1 = ensureActor("Farmer Abe", ActorType.FARMER,
//                "Oromia", "Guji", "Hambela", "03", 6.12345, 38.98765);
//
//        Actor farmer2 = ensureActor("Farmer Sara", ActorType.FARMER,
//                "SNNPR", "Sidama", "Dale", "02", 6.23456, 38.45678);
//
//        Actor washing = ensureActor("Hambela Washing Station", ActorType.WASHING_STATION,
//                "Oromia", "Guji", "Hambela", "01", 6.34567, 38.56789);
//
//        Actor dryMill = ensureActor("Addis Dry Mill", ActorType.DRYING_STATION,
//                "Addis Ababa", "Nifas Silk", "AA01", "01", 8.9806, 38.7578);
//
//        Actor exporter = ensureActor("Guji Prime Exporters", ActorType.EXPORTER,
//                "Addis Ababa", "Bole", "AA02", "01", 9.01234, 38.78901);
//
//        // ---- FARMS ----
//        Farm farmA = ensureFarm(farmer1, "Abe Farm", samplePolygon1(), 2.4, 1950, "74110");
//        Farm farmB = ensureFarm(farmer2, "Sara Farm", samplePolygon2(), 1.8, 1850, "74158");
//
//        // ---- DELIVERIES ----
//        FarmerDelivery d1 = deliveryRepo.save(
//                FarmerDelivery.builder()
//                        .farmer(farmer1)
//                        .washingStation(washing)
//                        .farm(farmA)
//                        .deliveryTime(LocalDateTime.now().minusDays(15))
//                        .cherryKg(120.0)
//                        .receiptNumber("DEL-ABE-001")
//                        .build());
//
//        FarmerDelivery d2 = deliveryRepo.save(
//                FarmerDelivery.builder()
//                        .farmer(farmer2)
//                        .washingStation(washing)
//                        .farm(farmB)
//                        .deliveryTime(LocalDateTime.now().minusDays(14))
//                        .cherryKg(95.0)
//                        .receiptNumber("DEL-SARA-001")
//                        .build());
//
//        // ---- BATCH ----
//        Batch batch = batchRepo.findByBatchCode("WS-GUJI-2025-009")
//                .orElseGet(() -> batchRepo.save(
//                        Batch.builder()
//                                .batchCode("WS-GUJI-2025-009")
//                                .station(washing)
//                                .processType("WASHED")
//                                .fermentationStart(LocalDate.now().minusDays(14))
//                                .fermentationEnd(LocalDate.now().minusDays(13))
//                                .dryingStart(LocalDate.now().minusDays(13))
//                                .dryingEnd(LocalDate.now().minusDays(7).atStartOfDay())
//                                .totalCherryKg(215.0)
//                                .parchmentKg(85.0)
//                                .status("CREATED")
//                                .qrCode("QR-WS-GUJI-2025-009")
//                                .build()
//                ));
//
//        d1.setBatch(batch);
//        d2.setBatch(batch);
//        deliveryRepo.saveAll(List.of(d1, d2));
//
//        // ---- DRY MILL ----
//        DryMillBatch dryBatch = dryRepo.save(
//                DryMillBatch.builder()
//                        .dryMill(dryMill)
//                        .parchmentBatch(batch)
//                        .millingDate(LocalDate.now().minusDays(5))
//                        .inputParchmentKg(85.0)
//                        .outputGreenKg(68.0)
//                        .moisturePercent(11.5)
//                        .defectCount(3)
//                        .screenSize(16)
//                        .grade("G1")
//                        .build());
//
//        // ---- GREEN LOT ----
//        GreenLot green = greenRepo.findByLotCode("GUJI-2025-0009")
//                .orElseGet(() -> greenRepo.save(
//                        GreenLot.builder()
//                                .lotCode("GUJI-2025-0009")
//                                .totalGreenKg(68.0)
//                                .grade("G1")
//                                .processingType("WASHED")
//                                .build()
//                ));
//
//        if (!green.getMillBatches().contains(dryBatch)) {
//            green.getMillBatches().add(dryBatch);
//            green = greenRepo.save(green);
//        }
//
//        // ---- EXPORT LOT ----
//        GreenLot finalGreen = green;
//        ExportLot exportLot = exportRepo.findByExportCode("EXP-GUJI-2025-0009")
//                .orElseGet(() -> exportRepo.save(
//                        ExportLot.builder()
//                                .greenLot(finalGreen)
//                                .exporter(exporter)
//                                .exportCode("EXP-GUJI-2025-0009")
//                                .bagCount(10)
//                                .bagWeightKg(60)
//                                .ecxCode("ECX123456")
//                                .exportLicense("EXP-ET-000999")
//                                .packingDate(LocalDate.now().minusDays(3))
//                                .build()
//                ));
//
//        // ---- QR CODE (SAFE!) ----
//        String token = "QR-" + exportLot.getExportCode();
//
//        qrRepo.findByUrlToken(token).orElseGet(() ->
//                qrRepo.save(QrCode.builder()
//                        .exportLot(exportLot)
//                        .urlToken(token)
//                        .createdAt(LocalDateTime.now())
//                        .build())
//        );
//
//        System.out.println("✅ Seeder ran successfully without duplicates!");
//    }
//
//    // ---- Helpers ----
//    private Actor ensureActor(String name, ActorType type,
//                              String region, String zone, String woreda, String kebele,
//                              Double lat, Double lon) {
//        return actorRepo.findByType(type).stream()
//                .filter(a -> a.getName().equalsIgnoreCase(name))
//                .findFirst()
//                .orElseGet(() -> actorRepo.save(
//                        Actor.builder()
//                                .name(name)
//                                .type(type)
//                                .region(region)
//                                .zone(zone)
//                                .woreda(woreda)
//                                .kebele(kebele)
//                                .latitude(lat)
//                                .longitude(lon)
//                                .build()
//                ));
//    }
//
//    private Farm ensureFarm(Actor farmer, String name, String geoJson,
//                            double areaHa, int elevation, String variety) {
//        return farmRepo.findFarmsByFarmerId(farmer.getId()).stream()
//                .filter(f -> name.equals(f.getName()))
//                .findFirst()
//                .orElseGet(() -> farmRepo.save(
//                        Farm.builder()
//                                .farmer(farmer)
//                                .name(name)
//                                .region(geoJson)
//                                .areaHa(areaHa)
//                                .elevationM(elevation)
//                                .variety(variety)
//                                .build()
//                ));
//    }
//
//    private String samplePolygon1() {
//        return """
//                {"type":"Polygon","coordinates":[[[38.72,9.03],[38.721,9.031],[38.722,9.029],[38.72,9.03]]]}
//                """;
//    }
//
//    private String samplePolygon2() {
//        return """
//                {"type":"Polygon","coordinates":[[[38.70,8.999],[38.701,9.000],[38.699,8.998],[38.70,8.999]]]}
//                """;
//    }
//}

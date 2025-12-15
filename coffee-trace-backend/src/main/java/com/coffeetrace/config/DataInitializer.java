package com.coffeetrace.config;

import com.coffeetrace.auth.AppUser;
import com.coffeetrace.auth.Role;
import com.coffeetrace.auth.UserRepository;
import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.supplychain.*;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
//
//@Component
//@Order(100)
//@DependsOn("entityManagerFactory")
//public class DataInitializer implements CommandLineRunner {
//
//    private final PasswordEncoder passwordEncoder;
//    private final UserRepository userRepo;
//
//    public DataInitializer(PasswordEncoder passwordEncoder, UserRepository userRepo) {
//        this.passwordEncoder = passwordEncoder;
//        this.userRepo = userRepo;
//    }
//
//    @Bean
//    CommandLineRunner initData(UserRepository userRepo,
//                               ActorRepository actorRepo,
//                               FarmRepository farmRepo,
//                               BatchRepository batchRepo,
//                               FarmerDeliveryRepository deliveryRepo,
//                               DryMillBatchRepository dryRepo,
//                               GreenLotRepository greenRepo,
//                               ExportLotRepository exportRepo,
//                               ShipmentRepository shipRepo) {
//        return args -> {
//            if (userRepo.count() == 0) {
//                userRepo.save(AppUser.builder()
//                        .username("admin")
//                        .password(passwordEncoder.encode("admin123"))
//                        .role(Role.ADMIN)
//                        .build());
//
//                userRepo.save(AppUser.builder()
//                        .username("exporter")
//                        .password(passwordEncoder.encode("exporter123"))
//                        .role(Role.EXPORTER)
//                        .build());
//            }
//
//            if (actorRepo.count() == 0) {
//                Actor farmer1 = actorRepo.save(Actor.builder()
//                        .name("Farmer A")
//                        .type(ActorType.valueOf("FARMER"))
//                        .region("Oromia")
//                        .zone("Guji")
//                        .woreda("Uraga")
//                        .kebele("Kebele 01")
//                        .latitude(6.1)
//                        .longitude(38.2)
//                        .build());
//
//                Actor farmer2 = actorRepo.save(Actor.builder()
//                        .name("Farmer B")
//                        .type(ActorType.valueOf("FARMER"))
//                        .region("Oromia")
//                        .zone("Guji")
//                        .woreda("Uraga")
//                        .kebele("Kebele 02")
//                        .latitude(6.2)
//                        .longitude(38.25)
//                        .build());
//
//                Actor washing = actorRepo.save(Actor.builder()
//                        .name("Guji Washing Station")
//                        .type(ActorType.valueOf("WASHING_STATION"))
//                        .region("Oromia")
//                        .zone("Guji")
//                        .woreda("Uraga")
//                        .kebele("Town Center")
//                        .build());
//
//                Actor dryMill = actorRepo.save(Actor.builder()
//                        .name("Addis Dry Mill")
//                        .type(ActorType.valueOf("DRY_MILL"))
//                        .region("Addis Ababa")
//                        .zone("Bole")
//                        .woreda("Bole")
//                        .kebele("Kebele 05")
//                        .build());
//
//                Actor exporter = actorRepo.save(Actor.builder()
//                        .name("GreenCoffee Export Plc")
//                        .type(ActorType.valueOf("EXPORTER"))
//                        .region("Addis Ababa")
//                        .zone("Bole")
//                        .woreda("Bole")
//                        .kebele("Kebele 10")
//                        .build());
//
//                Farm farm1 = farmRepo.save(Farm.builder()
//                        .farmer(farmer1)
//                        .name("Farm A")
//                        .areaHa(1.5)
//                        .elevationM(1900)
//                        .variety("Heirloom")
//                        .geomGeoJson("""
//                          {"type":"Polygon","coordinates":[[[38.2,6.1],[38.201,6.1],[38.201,6.101],[38.2,6.1]]]}
//                        """)
//                        .build());
//
//                Farm farm2 = farmRepo.save(Farm.builder()
//                        .farmer(farmer2)
//                        .name("Farm B")
//                        .areaHa(2.0)
//                        .elevationM(1950)
//                        .variety("Heirloom")
//                        .geomGeoJson("""
//                          {"type":"Polygon","coordinates":[[[38.25,6.2],[38.251,6.2],[38.251,6.201],[38.25,6.2]]]}
//                        """)
//                        .build());
//
//                Batch batch = batchRepo.save(
//                        Batch.builder()
//                                .batchCode("GUJI-2025-001")
//                                .station(washing)     // <-- FIXED
//                                .status("CREATED")
//                                .totalCherryKg(800.0)
//                                .build()
//                );
//
//                deliveryRepo.save(FarmerDelivery.builder()
//                        .farmer(farmer1)
//                        .washingStation(washing)
//                        .farm(farm1)
//                        .batch(batch)
//                        .deliveryTime(LocalDateTime.now().minusDays(8))
//                        .cherryKg(300.0)
//                        .receiptNumber("REC-001")
//                        .build());
//
//                deliveryRepo.save(FarmerDelivery.builder()
//                        .farmer(farmer2)
//                        .washingStation(washing)
//                        .farm(farm2)
//                        .batch(batch)
//                        .deliveryTime(LocalDateTime.now().minusDays(8))
//                        .cherryKg(500.0)
//                        .receiptNumber("REC-002")
//                        .build());
//
//                DryMillBatch dry = dryRepo.save(DryMillBatch.builder()
//                        .dryMill(dryMill)
//                        .parchmentBatch(batch)
//                        .millingDate(LocalDate.now().minusDays(1))
//                        .inputParchmentKg(160.0)
//                        .outputGreenKg(120.0)
//                        .moisturePercent(11.0)
//                        .defectCount(20)
//                        .screenSize(15)
//                        .grade("G1")
//                        .build());
//
//                GreenLot green = greenRepo.save(GreenLot.builder()
//                        .lotCode("GRN-GUJI-2025-001")
//                        .totalGreenKg(120.0)
//                        .grade("G1")
//                        .processingType("WASHED")
//                        .build());
//                green.getMillBatches().add(dry);
//                greenRepo.save(green);
//
//                ExportLot exportLot = exportRepo.save(ExportLot.builder()
//                        .greenLot(green)
//                        .exporter(exporter)
//                        .exportCode("EXP-GUJI-2025-001")
//                        .bagCount(2)
//                        .bagWeightKg(60)
//                        .ecxCode("ECX-12345")
//                        .exportLicense("LIC-001")
//                        .packingDate(LocalDate.now())
//                        .build());
//
//                shipRepo.save(Shipment.builder()
//                        .exporter(exporter)
//                        .exportLot(exportLot)
//                        .containerNo("CONT-001")
//                        .billOfLading("BOL-001")
//                        .vesselName("MV ETHIOPIA")
//                        .destinationCountry("Germany")
//                        .departureDate(LocalDate.now().plusDays(3))
//                        .arrivalEstimate(LocalDate.now().plusDays(25))
//                        .build());
//            }
//        };
//    }
//
//    @Override
//    @Transactional
//    public void run(ApplicationArguments args) {
//        System.out.println("DB READY, running seeder...");
//        System.out.println("Users count: " + userRepo.count());
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//
//    }
//}

package com.coffeetrace.config;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.deliveries.FarmerDeliveryRepository;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.qr.QrCode;
import com.coffeetrace.qr.QrCodeRepository;
import com.coffeetrace.supplychain.DryMillBatch;
import com.coffeetrace.supplychain.DryMillBatchRepository;
import com.coffeetrace.supplychain.ExportLot;
import com.coffeetrace.supplychain.ExportLotRepository;
import com.coffeetrace.supplychain.GreenLot;
import com.coffeetrace.supplychain.GreenLotRepository;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

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

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seed() {

        System.out.println("=======================================");
        System.out.println("Starting BunaTrace Seeder");
        System.out.println("=======================================");

        Actor farmerAbe = actor(
                "9d3e5a2a-5625-47e6-9e18-0dd0b6428001",
                "Farmer Abe",
                ActorType.FARMER,
                "Oromia",
                "Guji",
                "Hambela",
                "03",
                6.12345,
                38.98765
        );

        Actor farmerSara = actor(
                "3be4979f-a18a-4f56-b47b-e0b8cd280002",
                "Farmer Sara",
                ActorType.FARMER,
                "Sidama",
                "Sidama",
                "Dale",
                "02",
                6.22345,
                38.48765
        );

        Actor station = actor(
                "49c911bb-c859-4f8e-aead-cfbc33e10001",
                "Hambela Washing Station",
                ActorType.WASHING_STATION,
                "Oromia",
                "Guji",
                "Hambela",
                "01",
                6.34567,
                38.56789
        );

        Actor dryMill = actor(
                "4f9b322c-18a9-45ae-b35a-e3ab004d1001",
                "Addis Dry Mill",
                ActorType.DRYING_STATION,
                "Addis Ababa",
                "Nifas Silk",
                "AA01",
                "01",
                8.9806,
                38.7578
        );

        Actor exporter = actor(
                "7d4cd27c-84f9-47ac-aef1-889bc71f2001",
                "Guji Prime Exporters",
                ActorType.EXPORTER,
                "Addis Ababa",
                "Bole",
                "AA02",
                "01",
                9.01234,
                38.78901

        );


//        private Actor farmerAbe;
        Farm abeFarm = farm(
                "8261d51e-704d-43ef-9b64-d2c81d0a2003",
                farmerAbe,
                "Abe Farm",
                samplePolygon1(),
                2.4,
                1950,
                "74110"
        );

        Farm saraFarm = farm(
                "7261d51e-704d-43ef-9b64-d2c81d0a2002",
                farmerSara,
                "Sara Farm",
                samplePolygon2(),
                1.8,
                1850,
                "74158"
        );

        FarmerDelivery delivery1 = delivery(
                farmerAbe,
                station,
                abeFarm,
                120.0,
                "DEL-ABE-001",
                LocalDateTime.now().minusDays(15)
        );

        FarmerDelivery delivery2 = delivery(
                farmerSara,
                station,
                saraFarm,
                95.0,
                "DEL-SARA-001",
                LocalDateTime.now().minusDays(14)
        );


    }

    private UUID uuid(String value) {
        return UUID.fromString(value);
    }

    private Actor actor(
            String id,
            String name,
            ActorType type,
            String region,
            String zone,
            String woreda,
            String kebele,
            Double latitude,
            Double longitude
    ) {

        UUID uuid = UUID.fromString(id);

        return actorRepo.findById(uuid)
                .orElseGet(() -> {

                    Actor actor = new Actor();

                    actor.setId(uuid);
                    actor.setName(name);
                    actor.setType(type);

                    actor.setRegion(region);
                    actor.setZone(zone);
                    actor.setWoreda(woreda);
                    actor.setKebele(kebele);

                    actor.setLatitude(latitude);
                    actor.setLongitude(longitude);

                    actor.setActive(true);

                    return actorRepo.save(actor);

                });

    }
    private Farm farm(
            String id,
            Actor farmer,
            String name,
            String geoJson,
            Double areaHectares,
            Integer elevation,
            String variety
    ) {

        UUID uuid = UUID.fromString(id);

        return farmRepo.findById(uuid)
                .orElseGet(() -> {

                    Farm farm = new Farm();

                    farm.setId(uuid);
                    farm.setFarmer(farmer);
                    farm.setName(name);

                    farm.setPolygon(geoJson);

                    farm.setAreaHectares(areaHectares);
                    farm.setElevation(elevation);
                    farm.setVariety(variety);

                    return farmRepo.save(farm);

                });

    }

    private String samplePolygon1() {

        return """
                {
                "type":"Polygon",
                "coordinates":[
                [
                [38.7200,6.1200],
                [38.7210,6.1210],
                [38.7220,6.1200],
                [38.7200,6.1200]
                ]
                ]
                }
                """;

    }

    private String samplePolygon2() {

        return """
                {
                "type":"Polygon",
                "coordinates":[
                [
                [38.7000,6.2200],
                [38.7010,6.2210],
                [38.7020,6.2200],
                [38.7000,6.2200]
                ]
                ]
                }
                """;

    }
//
//    private Actor farmerAbe;
//    Farm abeFarm = farm(
//            "8261d51e-704d-43ef-9b64-d2c81d0a2003",
//            farmerAbe,
//            "Abe Farm",
//            samplePolygon1(),
//            2.4,
//            1950,
//            "74110"
//    );
//
//    Farm saraFarm = farm(
//            "7261d51e-704d-43ef-9b64-d2c81d0a2002",
//            farmerSara,
//            "Sara Farm",
//            samplePolygon2(),
//            1.8,
//            1850,
//            "74158"
//    );

    private FarmerDelivery delivery(
            Actor farmer,
            Actor station,
            Farm farm,
            Double cherryKg,
            String receipt,
            LocalDateTime date
    ) {

        FarmerDelivery delivery = FarmerDelivery.builder()
                .farmer(farmer)
                .washingStation(station)
                .farm(farm)
                .deliveryTime(date)
                .receiptNumber(receipt)
                .cherryKg(cherryKg)
                .build();

        return deliveryRepo.save(delivery);

    }

}
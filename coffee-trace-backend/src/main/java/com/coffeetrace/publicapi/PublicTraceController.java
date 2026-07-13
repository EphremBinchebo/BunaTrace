package com.coffeetrace.publicapi;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.users.Actor;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicTraceController {

    private final BatchRepository batchRepository;

    @GetMapping("/trace/{batchCode}")
    public ResponseEntity<PublicTraceResponse> trace(
            @PathVariable String batchCode) {

        Batch batch = batchRepository.findByBatchCode(batchCode)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        PublicTraceResponse response = new PublicTraceResponse();

        /*
         * Batch
         */
        response.setBatchId(batch.getBatchCode());
        response.setVerified(true);
        response.setProcess(batch.getProcessType());
        response.setCherryKg(batch.getTotalCherryKg());
        response.setParchmentKg(batch.getParchmentKg());

        if (batch.getCreatedAt() != null) {
            response.setHarvestDate(batch.getCreatedAt().toString());
        }

        /*
         * Washing Station
         */
        Actor station = batch.getStation();

        if (station != null) {
            response.setStation(station.getName());
        }

        /*
         * Farmer & Farm
         */
        List<FarmerDelivery> deliveries = batch.getDeliveries();

        if (deliveries != null && !deliveries.isEmpty()) {

            FarmerDelivery delivery = deliveries.get(0);

            /*
             * Farmer
             */
            if (delivery.getFarmer() != null) {

                Actor farmer = delivery.getFarmer();

                response.setFarmerId(farmer.getId());
                response.setFarmer(farmer.getName());

                response.setRegion(farmer.getRegion());
                response.setZone(farmer.getZone());
                response.setWoreda(farmer.getWoreda());
                response.setKebele(farmer.getKebele());

                response.setLatitude(farmer.getLatitude());
                response.setLongitude(farmer.getLongitude());
            }

            /*
             * Farm
             */
            if (delivery.getFarm() != null) {

                response.setFarm(delivery.getFarm().getName());

                response.setVariety(
                        delivery.getFarm().getVariety()
                );

                response.setElevation(
                        delivery.getFarm().getElevation()
                );
            }
        }

        /*
         * Coffee Journey
         */
        response.setJourney(List.of(

                new PublicTraceResponse.JourneyStep(
                        "Farm",
                        batch.getCreatedAt() != null
                                ? batch.getCreatedAt().toString()
                                : ""
                ),

                new PublicTraceResponse.JourneyStep(
                        "Harvest",
                        batch.getFermentationStart() != null
                                ? batch.getFermentationStart().toString()
                                : ""
                ),

                new PublicTraceResponse.JourneyStep(
                        "Wash",
                        batch.getFermentationEnd() != null
                                ? batch.getFermentationEnd().toString()
                                : ""
                ),

                new PublicTraceResponse.JourneyStep(
                        "Dry",
                        batch.getDryingStart() != null
                                ? batch.getDryingStart().toString()
                                : ""
                ),

                new PublicTraceResponse.JourneyStep(
                        "Mill",
                        batch.getDryingEnd() != null
                                ? batch.getDryingEnd().toString()
                                : ""
                ),

                new PublicTraceResponse.JourneyStep(
                        "Export",
                        batch.getStatus()
                )
        ));

        return ResponseEntity.ok(response);
    }
}

package com.coffeetrace.processing;

import com.coffeetrace.processing.dto.*;
import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.deliveries.FarmerDeliveryRepository;
import com.coffeetrace.supplychain.*;
//import com.coffeetrace.supplychain.DryMillBatchRepository;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BatchWorkflowService {

    private final ActorRepository actorRepo;
    private final BatchRepository batchRepo;
    private final FarmerDeliveryRepository deliveryRepo;
    private final DryMillBatchRepository dryRepo;
    private final GreenLotRepository greenRepo;
    private final ExportLotRepository exportRepo;
    private final ShipmentRepository shipmentRepo;


    @Autowired
    public BatchWorkflowService(ActorRepository actorRepo, BatchRepository batchRepo, FarmerDeliveryRepository deliveryRepo, GreenLotRepository greenRepo, ExportLotRepository exportRepo, ShipmentRepository shipmentRepo, DryMillBatchRepository dryRepo) {
        this.actorRepo = actorRepo;
        this.batchRepo = batchRepo;
        this.deliveryRepo = deliveryRepo;
        this.greenRepo = greenRepo;
        this.exportRepo = exportRepo;

        this.shipmentRepo = shipmentRepo;
        this.dryRepo = dryRepo;
    }

    // ---------- BATCH (WASHING STATION) -------------------------------------

//    @Transactional
//    public Batch createBatch(BatchCreateRequest req) {
//
//        Actor station = actorRepo.findById(req.getStationId())
//                .orElseThrow(() -> new IllegalArgumentException("Station not found"));
//
//        List<FarmerDelivery> deliveries = new ArrayList<>();
//        if (req.getDeliveryIds() != null) {
//            deliveries = deliveryRepo.findAllById(req.getDeliveryIds());
//        }
//
//        Batch batch = Batch.builder()
//                .id(UUID.randomUUID())
//                .batchCode(req.getBatchCode())
//                .station(station)
//                .processType(req.getProcessType())
//
//                .fermentationStart(req.getFermentationStart())
//                .fermentationEnd(req.getFermentationEnd())
//                .dryingStart(req.getDryingStart())
//                .dryingEnd(req.getDryingEnd())
//
//                .totalCherryKg(req.getTotalCherryKg())
//                .parchmentKg(req.getParchmentKg())
//                .deliveries(deliveries)
//
//                .status("CREATED")
//                .createdAt(LocalDate.now())
//
//                .build();
//
//        return batchRepo.save(batch);
//
//    }

    public Batch createBatch(BatchCreateRequest req) {

        if (req.getStationId() == null) throw new IllegalArgumentException("stationId is required");
        if (req.getBatchCode() == null || req.getBatchCode().isBlank()) throw new IllegalArgumentException("batchCode is required");
        if (req.getProcessType() == null || req.getProcessType().isBlank()) throw new IllegalArgumentException("processType is required");
        if (req.getDeliveryIds() == null || req.getDeliveryIds().isEmpty()) throw new IllegalArgumentException("deliveryIds is required");

        if (batchRepo.existsByBatchCode(req.getBatchCode())) {
            throw new IllegalArgumentException("batchCode already exists: " + req.getBatchCode());
        }

        Actor station = actorRepo.findById(req.getStationId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid stationId"));

        List<FarmerDelivery> deliveries = deliveryRepo.findAllById(req.getDeliveryIds());
        if (deliveries.size() != req.getDeliveryIds().size()) {
            throw new IllegalArgumentException("Some deliveryIds not found");
        }

        // Validate deliveries
        for (FarmerDelivery d : deliveries) {
            if (d.getBatch() != null) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Delivery already assigned to another batch"
                );
            }
//            if (d.getBatch() != null) {
//                throw new IllegalArgumentException("Delivery already assigned to batch: " + d.getId());
//            }
            if (d.getWashingStation() == null || !d.getWashingStation().getId().equals(station.getId())) {
                throw new IllegalArgumentException("Delivery station mismatch: " + d.getId());
            }
        }

        // Create QR token (simple)
        String qr = "QR-" + req.getBatchCode();

        Batch batch = Batch.builder()
                .batchCode(req.getBatchCode())
                .station(station)
                .processType(req.getProcessType())
                .fermentationStart(req.getFermentationStart())
                .fermentationEnd(req.getFermentationEnd())
                .dryingStart(req.getDryingStart())
                .dryingEnd(req.getDryingEnd())
                .totalCherryKg(req.getTotalCherryKg())
                .parchmentKg(req.getParchmentKg())
                .status("CREATED")
                .qrCode(qr)
                .build();

        Batch saved = batchRepo.save(batch);

        // Attach deliveries to batch
        for (FarmerDelivery d : deliveries) {
            d.setBatch(saved);
        }
        deliveryRepo.saveAll(deliveries);

        return saved;
    }


    @Transactional
    public Batch attachDeliveriesToBatch(UUID batchId, List<UUID> deliveryIds) {

        Batch batch = batchRepo.findById(batchId)
                .orElseThrow(() -> new IllegalArgumentException("Batch not found"));

        List<FarmerDelivery> deliveries = deliveryRepo.findAllById(deliveryIds);
        if (deliveries.isEmpty()) {
            throw new IllegalArgumentException("No deliveries found for given ids");
        }

        double totalCherry = batch.getTotalCherryKg() != null ? batch.getTotalCherryKg() : 0.0;

        for (FarmerDelivery d : deliveries) {
            d.setBatch(batch);
            totalCherry += d.getCherryKg() != null ? d.getCherryKg() : 0.0;
        }

        batch.setTotalCherryKg(totalCherry);

        deliveryRepo.saveAll(deliveries);
        return batchRepo.save(batch);
    }

    // ---------- DRY MILL BATCH ----------------------------------------------

    @Transactional
    public DryMillBatch createDryMillBatch(DryMillBatchCreateRequest req) {

        Actor dryMill = actorRepo.findById(req.getDryMillId())
                .orElseThrow(() -> new IllegalArgumentException("Dry mill not found"));

        Batch parchmentBatch = batchRepo.findById(req.getBatchId())
                .orElseThrow(() -> new IllegalArgumentException("Batch not found"));

        DryMillBatch dry = DryMillBatch.builder()
                .dryMill(dryMill)
                .parchmentBatch(parchmentBatch)
                .millingDate(req.getMillingDate())
                .inputParchmentKg(req.getInputParchmentKg())
                .outputGreenKg(req.getOutputGreenKg())
                .moisturePercent(req.getMoisturePercent())
                .defectCount(req.getDefectCount())
                .screenSize(req.getScreenSize())
                .grade(req.getGrade())
                .build();

        return dryRepo.save(dry);
    }

    // ---------- GREEN LOT ----------------------------------------------------

    @Transactional
    public GreenLot createGreenLot(GreenLotCreateRequest req) {

        DryMillBatch dry = dryRepo.findById(req.getDryMillBatchId())
                .orElseThrow(() -> new IllegalArgumentException("Dry mill batch not found"));

        GreenLot lot = greenRepo.findByLotCode(req.getLotCode())
                .orElse(GreenLot.builder()
                        .lotCode(req.getLotCode())
                        .totalGreenKg(req.getTotalGreenKg())
                        .grade(req.getGrade())
                        .processingType(req.getProcessingType())
                        .build()
                );

        if (!lot.getMillBatches().contains(dry)) {
            lot.getMillBatches().add(dry);
        }

        return greenRepo.save(lot);
    }

    // ---------- EXPORT LOT ---------------------------------------------------

    @Transactional
    public ExportLot createExportLot(ExportLotCreateRequest req) {

        GreenLot lot = greenRepo.findById(req.getGreenLotId())
                .orElseThrow(() -> new IllegalArgumentException("Green lot not found"));

        Actor exporter = actorRepo.findById(req.getExporterId())
                .orElseThrow(() -> new IllegalArgumentException("Exporter not found"));

        ExportLot exportLot = exportRepo.findByExportCode(req.getExportCode())
                .orElse(ExportLot.builder()
                        .greenLot(lot)
                        .exporter(exporter)
                        .exportCode(req.getExportCode())
                        .bagCount(req.getBagCount())
                        .bagWeightKg(req.getBagWeightKg())
                        .ecxCode(req.getEcxCode())
                        .exportLicense(req.getExportLicense())
                        .packingDate(req.getPackingDate())
                        .build()
                );

        return exportRepo.save(exportLot);
    }

    // ---------- SHIPMENT -----------------------------------------------------

    @Transactional
    public Shipment createShipment(ShipmentCreateRequest req) {

        ExportLot exportLot = exportRepo.findById(req.getExportLotId())
                .orElseThrow(() -> new IllegalArgumentException("Export lot not found"));

        Actor exporter = actorRepo.findById(req.getExporterId())
                .orElseThrow(() -> new IllegalArgumentException("Exporter not found"));

        Shipment shipment = Shipment.builder()
                .exporter(exporter)
                .exportLot(exportLot)
                .containerNo(req.getContainerNo())
                .billOfLading(req.getBillOfLading())
                .vesselName(req.getVesselName())
                .destinationCountry(req.getDestinationCountry())
                .departureDate(req.getDepartureDate())
                .arrivalEstimate(req.getArrivalEstimate())
                .build();

        return shipmentRepo.save(shipment);
    }

    public Batch getBatchByQrCode(String qrCode) {
        return batchRepo.findByQrCode(qrCode)
                .orElseThrow(() -> new RuntimeException("Batch not found"));
    }

}

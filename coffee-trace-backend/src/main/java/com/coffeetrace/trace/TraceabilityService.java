package com.coffeetrace.trace;

import com.coffeetrace.users.Actor;
import com.coffeetrace.supplychain.ExportLot;
import com.coffeetrace.supplychain.ExportLotRepository;
import com.coffeetrace.supplychain.Shipment;
import com.coffeetrace.supplychain.ShipmentRepository;
import com.coffeetrace.batch.Batch;
import com.coffeetrace.supplychain.DryMillBatch;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.farms.Farm;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TraceabilityService {

    private final ExportLotRepository exportLotRepo;
    private final ShipmentRepository shipmentRepo;

    /** -----------------------------------------------------
     *  MAIN TRACE FUNCTION
     *  ----------------------------------------------------- */
    public ExportTraceDto traceByExportCode(String exportCode) {

        ExportLot exportLot = exportLotRepo.findByExportCode(exportCode)
                .orElseThrow(() -> new RuntimeException("Export lot not found: " + exportCode));

        var green = exportLot.getGreenLot();
        var dryBatches = green.getMillBatches();

        Set<Batch> allBatches = new HashSet<>();
        Set<FarmerDelivery> allDeliveries = new HashSet<>();

        // Collect parchment batches + farmer deliveries
        for (DryMillBatch dry : dryBatches) {
            Batch pb = dry.getParchmentBatch();
            if (pb != null) {
                allBatches.add(pb);
                allDeliveries.addAll(pb.getDeliveries());
            }
        }

        List<FarmerContributionDto> farmerContribs = computeFarmerContributions(allDeliveries);
        List<ProcessingStepView> steps = buildProcessingSteps(allBatches, dryBatches, exportLot);
        List<FarmView> farms = buildFarmViews(allDeliveries);

        ShipmentInfo shipmentInfo = buildShipmentInfo(exportLot.getId());
        Actor exporter = exportLot.getExporter();

        return ExportTraceDto.builder()
                .exportCode(exportLot.getExportCode())
                .greenLotCode(green.getLotCode())
                .grade(green.getGrade())
                .totalGreenKg(green.getTotalGreenKg())
                .exporterName(exporter.getName())
                .exportLicense(exportLot.getExportLicense())
                .bagCount(exportLot.getBagCount())
                .bagWeightKg(exportLot.getBagWeightKg())
                .shipment(shipmentInfo)
                .farmers(farmerContribs)
                .processingSteps(steps)
                .farms(farms)
                .build();
    }

    /** -----------------------------------------------------
     *  SHIPMENT INFO BUILDER
     *  ----------------------------------------------------- */
    private ShipmentInfo buildShipmentInfo(UUID exportLotId) {
        List<Shipment> shipments = shipmentRepo.findByExportLotId(exportLotId);
        if (shipments.isEmpty()) return null;

        Shipment s = shipments.get(0);

        return ShipmentInfo.builder()
                .containerNo(s.getContainerNo())
                .billOfLading(s.getBillOfLading())
                .vesselName(s.getVesselName())
                .destinationCountry(s.getDestinationCountry())
                .departureDate(s.getDepartureDate() != null ? s.getDepartureDate().toString() : null)
                .arrivalEstimate(s.getArrivalEstimate() != null ? s.getArrivalEstimate().toString() : null)
                .build();
    }

    /** -----------------------------------------------------
     *  FARMER CONTRIBUTION CALCULATOR
     *  ----------------------------------------------------- */
    private List<FarmerContributionDto> computeFarmerContributions(Set<FarmerDelivery> deliveries) {

        Map<Actor, Double> cherryByFarmer = new HashMap<>();
        Map<Actor, Set<UUID>> farmsByFarmer = new HashMap<>();

        for (FarmerDelivery d : deliveries) {
            Actor farmer = d.getFarmer();
            double cherryKg = d.getCherryKg();
            UUID farmId = d.getFarm().getId();

            cherryByFarmer.merge(farmer, cherryKg, Double::sum);
            farmsByFarmer.computeIfAbsent(farmer, x -> new HashSet<>()).add(farmId);
        }

        double totalCherry = cherryByFarmer.values().stream().mapToDouble(Double::doubleValue).sum();
        if (totalCherry <= 0) totalCherry = 1.0;

        double finalTotalCherry = totalCherry;

        return cherryByFarmer.entrySet()
                .stream()
                .map(entry -> {
                    Actor farmer = entry.getKey();
                    double cherryKg = entry.getValue();
                    double percent = (cherryKg / finalTotalCherry) * 100.0;
                    int farmCount = farmsByFarmer.getOrDefault(farmer, Set.of()).size();

                    return FarmerContributionDto.builder()
                            .farmerId(farmer.getId())
                            .farmerName(farmer.getName())
                            .region(farmer.getRegion())
                            .zone(farmer.getZone())
                            .woreda(farmer.getWoreda())
                            .kebele(farmer.getKebele())
                            .totalCherryKg(cherryKg)
                            .sharePercent(percent)
                            .farmCount(farmCount)
                            .photoUrl(farmer.getPhotoUrl())
                            .build();
                })
                .sorted(Comparator.comparingDouble(FarmerContributionDto::getSharePercent).reversed())
                .collect(Collectors.toList());
    }

    /** -----------------------------------------------------
     *  PROCESSING STEPS BUILDER
     *  ----------------------------------------------------- */
    private List<ProcessingStepView> buildProcessingSteps(
            Set<Batch> batches,
            List<DryMillBatch> dryBatches,
            ExportLot exportLot
    ) {
        List<ProcessingStepView> result = new ArrayList<>();

        // Washing / Wet Mill stage
        for (Batch pb : batches) {
            result.add(ProcessingStepView.builder()
                    .type("WASHING")
                    .actorName(pb.getStation().getName())
                    .actorType(pb.getStation().getType().name())
                    .date(pb.getDryingEnd() != null ? pb.getDryingEnd().toString() : null)
                    .description(String.format(
                            "Batch %s (%s), totalCherry=%.1f kg, parchment=%.1f kg",
                            pb.getBatchCode(), pb.getProcessType(),
                            pb.getTotalCherryKg(), pb.getParchmentKg()
                    ))
                    .build());
        }

        // Dry Mill stage
        for (DryMillBatch d : dryBatches) {
            result.add(ProcessingStepView.builder()
                    .type("DRY_MILL")
                    .actorName(d.getDryMill().getName())
                    .actorType(d.getDryMill().getType().name())
                    .date(d.getMillingDate() != null ? d.getMillingDate().toString() : null)
                    .description(String.format(
                            "Input parchment=%.1f kg, output green=%.1f kg, grade=%s, screen=%d",
                            d.getInputParchmentKg(), d.getOutputGreenKg(),
                            d.getGrade(), d.getScreenSize()
                    ))
                    .build());
        }

        // Export stage
        result.add(ProcessingStepView.builder()
                .type("EXPORT")
                .actorName(exportLot.getExporter().getName())
                .actorType(exportLot.getExporter().getType().name())
                .date(exportLot.getPackingDate() != null ? exportLot.getPackingDate().toString() : null)
                .description(String.format(
                        "Export lot %s, bags=%d x %d kg, grade=%s",
                        exportLot.getExportCode(),
                        exportLot.getBagCount(),
                        exportLot.getBagWeightKg(),
                        exportLot.getGreenLot().getGrade()
                ))
                .build());

        return result;
    }

    /** -----------------------------------------------------
     *  FARM VIEW BUILDER
     *  ----------------------------------------------------- */
    private List<FarmView> buildFarmViews(Set<FarmerDelivery> deliveries) {

        Map<UUID, Farm> farms = new HashMap<>();
        for (FarmerDelivery d : deliveries) {
            farms.putIfAbsent(d.getFarm().getId(), d.getFarm());
        }

        return farms.values()
                .stream()
                .map(f -> {
                    Actor farmer = f.getFarmer();

                    return FarmView.builder()
                            .farmId(f.getId())
                            .farmerId(farmer.getId())
                            .farmerName(farmer.getName())
                            .areaHa(f.getAreaHa())
                            .elevationM(f.getElevationM())
                            .region(f.getRegion())
                            .zone(f.getZone())
                            .woreda(f.getWoreda())
                            .kebele(f.getKebele())
                            .build();
                })
                .collect(Collectors.toList());
    }
}

//import com.coffeetrace.batch.Batch;
//import com.coffeetrace.farms.Farm;
//import com.coffeetrace.supplychain.*;
//import com.coffeetrace.users.Actor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//import java.util.stream.Collectors;


//@Service
//public class TraceabilityService {
//
//    private final ExportLotRepository exportLotRepo;
//    private final ShipmentRepository shipmentRepo;
//
//    public TraceabilityService(ExportLotRepository exportLotRepo, ShipmentRepository shipmentRepo) {
//        this.exportLotRepo = exportLotRepo;
//        this.shipmentRepo = shipmentRepo;
//    }
//
//    public ExportTraceDto traceByExportCode(String exportCode) {
//        ExportLot exportLot = exportLotRepo.findByExportCode(exportCode)
//                .orElseThrow(() -> new RuntimeException("Export lot not found: " + exportCode));
//
//        GreenLot green = exportLot.getGreenLot();
//        List<DryMillBatch> dryBatches = green.getMillBatches();
//
//        Set<Batch> allBatches = new HashSet<>();
//        Set<FarmerDelivery> allDeliveries = new HashSet<>();
//
//        for (DryMillBatch dry : dryBatches) {
//            Batch pb = dry.getParchmentBatch();
//            if (pb != null) {
//                allBatches.add(pb);
//                allDeliveries.addAll(pb.getDeliveries());
//            }
//        }
//
//        List<FarmerContributionDto> farmerContribs = computeFarmerContributions(allDeliveries);
//        List<ProcessingStepView> steps = buildProcessingSteps(allBatches, dryBatches, exportLot);
//        List<FarmView> farms = buildFarmViews(allDeliveries);
//
//        ShipmentInfo shipmentInfo = null;
//        List<Shipment> shipments = shipmentRepo.findByExportLotId(exportLot.getId());
//        if (!shipments.isEmpty()) {
//            Shipment s = shipments.get(0);
//            shipmentInfo = ShipmentInfo.builder()
//                    .containerNo(s.getContainerNo())
//                    .billOfLading(s.getBillOfLading())
//                    .vesselName(s.getVesselName())
//                    .destinationCountry(s.getDestinationCountry())
//                    .departureDate(s.getDepartureDate() != null ? s.getDepartureDate().toString() : null)
//                    .arrivalEstimate(s.getArrivalEstimate() != null ? s.getArrivalEstimate().toString() : null)
//                    .build();
//        }
//
//        Actor exporter = exportLot.getExporter();
//
//        return ExportTraceDto.builder()
//                .exportCode(exportLot.getExportCode())
//                .greenLotCode(green.getLotCode())
//                .grade(green.getGrade())
//                .totalGreenKg(green.getTotalGreenKg())
//                .exporterName(exporter.getName())
//                .exportLicense(exportLot.getExportLicense())
//                .bagCount(exportLot.getBagCount())
//                .bagWeightKg(exportLot.getBagWeightKg())
//                .shipment(shipmentInfo)
//                .farmers(farmerContribs)
//                .processingSteps(steps)
//                .farms(farms)
//                .build();
//    }
//
////    private List<FarmerContributionDto> computeFarmerContributions(Set<FarmerDelivery> deliveries) {
////
////        // --- Aggregate cherry and farms by farmer ---
////        Map<Actor, Double> cherryByFarmer = new HashMap<>();
////        Map<Actor, Set<String>> farmsByFarmer = new HashMap<>();
////
////        for (FarmerDelivery d : deliveries) {
////            Actor farmer = d.getFarmer();
////            double cherryKg = d.getCherryKg();
////            UUID farmId = d.getFarm().getId();
////
////
////
////            cherryByFarmer.merge(farmer, cherryKg, Double::sum);
////            farmsByFarmer.computeIfAbsent(farmer, f -> new HashSet<>()).add(farmId);
////        }
////
////        // --- Compute total cherry (avoid divide by zero) ---
////        double totalCherry = cherryByFarmer.values()
////                .stream()
////                .mapToDouble(Double::doubleValue)
////                .sum();
////
////        if (totalCherry <= 0) {
////            totalCherry = 1.0;  // prevents division by zero
////        }
////
////        // --- Build DTO list ---
////        double finalTotalCherry = totalCherry;
////        return cherryByFarmer.entrySet()
////                .stream()
////                .map(entry -> {
////                    final Actor farmer = entry.getKey();
////                    final double cherryKg = entry.getValue();
////
////                    final double percent = (cherryKg / finalTotalCherry) * 100.0;
////                    final int farmCount = farmsByFarmer
////                            .getOrDefault(farmer, Set.of())
////                            .size();
////
////                    return FarmerContributionDto.builder()
////                            .farmerId(farmer.getId())
////                            .farmerName(farmer.getName())
////                            .region(farmer.getRegion())
////                            .zone(farmer.getZone())
////                            .woreda(farmer.getWoreda())
////                            .kebele(farmer.getKebele())
////                            .totalCherryKg(cherryKg)
////                            .sharePercent(percent)
////                            .farmCount(farmCount)
////                            .photoUrl(farmer.getPhotoUrl())
////                            .build();
////                })
////                .sorted(Comparator.comparingDouble(FarmerContributionDto::getSharePercent).reversed())
////                .collect(Collectors.toList());
////    }
//
//    private List<FarmerContributionDto> computeFarmerContributions(Set<FarmerDelivery> deliveries) {
//
//        // --- Aggregate cherry and farms by farmer ---
//        Map<Actor, Double> cherryByFarmer = new HashMap<>();
//        Map<Actor, Set<UUID>> farmsByFarmer = new HashMap<>();  // FIXED
//
//        for (FarmerDelivery d : deliveries) {
//            Actor farmer = d.getFarmer();
//            double cherryKg = d.getCherryKg();
//            UUID farmId = d.getFarm().getId();
//
//            cherryByFarmer.merge(farmer, cherryKg, Double::sum);
//
//            farmsByFarmer
//                    .computeIfAbsent(farmer, f -> new HashSet<>())
//                    .add(farmId);  // UUID is now allowed
//        }
//
//        // --- Compute total cherry and avoid divide by zero ---
//        double totalCherry = cherryByFarmer.values()
//                .stream()
//                .mapToDouble(Double::doubleValue)
//                .sum();
//
//        if (totalCherry <= 0) {
//            totalCherry = 1.0;
//        }
//
//        double finalTotalCherry = totalCherry;
//
//        // --- Build DTO list ---
//        return cherryByFarmer.entrySet()
//                .stream()
//                .map(entry -> {
//                    Actor farmer = entry.getKey();
//                    double cherryKg = entry.getValue();
//                    double percent = (cherryKg / finalTotalCherry) * 100.0;
//
//                    int farmCount = farmsByFarmer
//                            .getOrDefault(farmer, Set.of())
//                            .size();
//
//                    return FarmerContributionDto.builder()
//                            .farmerId(farmer.getId())
//                            .farmerName(farmer.getName())
//                            .region(farmer.getRegion())
//                            .zone(farmer.getZone())
//                            .woreda(farmer.getWoreda())
//                            .kebele(farmer.getKebele())
//                            .totalCherryKg(cherryKg)
//                            .sharePercent(percent)
//                            .farmCount(farmCount)
//                            .photoUrl(farmer.getPhotoUrl())
//                            .build();
//                })
//                .sorted(Comparator.comparingDouble(FarmerContributionDto::getSharePercent).reversed())
//                .collect(Collectors.toList());
//    }
//
//
//    private List<ProcessingStepView> buildProcessingSteps(
//            Set<Batch> batches,
//            List<DryMillBatch> dryBatches,
//            ExportLot exportLot
//    ) {
//        List<ProcessingStepView> result = new ArrayList<>();
//
//        for (Batch pb : batches) {
//            result.add(ProcessingStepView.builder()
//                    .type("WASHING")
//                    .actorName(pb.getStation().getName())
//                    .actorType(String.valueOf(pb.getStation().getType()))
//                    .date(pb.getDryingEnd() != null ? pb.getDryingEnd().toString() : null)
//                    .description(String.format(
//                            "Batch %s (%s), totalCherry=%.1f kg, parchment=%.1f kg",
//                            pb.getBatchCode(), pb.getProcessType(),
//                            pb.getTotalCherryKg(), pb.getParchmentKg()
//                    ))
//                    .build());
//        }
//
//        for (DryMillBatch d : dryBatches) {
//            result.add(ProcessingStepView.builder()
//                    .type("DRY_MILL")
//                    .actorName(d.getDryMill().getName())
//                    .actorType(String.valueOf(d.getDryMill().getType()))
//                    .date(d.getMillingDate() != null ? d.getMillingDate().toString() : null)
//                    .description(String.format(
//                            "Input parchment=%.1f kg, output green=%.1f kg, grade=%s, screen=%d",
//                            d.getInputParchmentKg(), d.getOutputGreenKg(), d.getGrade(), d.getScreenSize()
//                    ))
//                    .build());
//        }
//
//        result.add(ProcessingStepView.builder()
//                .type("EXPORT")
//                .actorName(exportLot.getExporter().getName())
//                .actorType(String.valueOf(exportLot.getExporter().getType()))
//                .date(exportLot.getPackingDate() != null ? exportLot.getPackingDate().toString() : null)
//                .description(String.format(
//                        "Export lot %s, bags=%d x %d kg, grade=%s",
//                        exportLot.getExportCode(), exportLot.getBagCount(),
//                        exportLot.getBagWeightKg(), exportLot.getGreenLot().getGrade()
//                ))
//                .build());
//
//        return result;
//    }
//
//    private List<FarmView> buildFarmViews(Set<FarmerDelivery> deliveries) {
//        Map<String, Farm> farmMap = new HashMap<>();
//        for (FarmerDelivery d : deliveries) {
//            farmMap.putIfAbsent(d.getFarm().getId(), d.getFarm());
//        }
//
//        return farmMap.values().stream().map(f -> {
//            Actor farmer = f.getFarmer();
//            return FarmView.builder()
//                    .farmId(f.getId())
//                    .farmerId(farmer.getId())
//                    .farmerName(farmer.getName())
//                    .geomGeoJson(f.getGeomGeoJson())
//                    .variety(f.getVariety())
//                    .elevationMasl(f.getElevationMasl())
//                    .region(farmer.getRegion())
//                    .zone(farmer.getZone())
//                    .woreda(farmer.getWoreda())
//                    .kebele(farmer.getKebele())
//                    .build();
//        }).collect(Collectors.toList());
//    }
//}

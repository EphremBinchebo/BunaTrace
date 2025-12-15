package com.coffeetrace.trace;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ExportTraceDto {

    private String exportCode;
    private String greenLotCode;
    private String grade;
    private Double totalGreenKg;

    private String exporterName;
    private String exportLicense;
    private Integer bagCount;
    private Integer bagWeightKg;

    private ShipmentInfo shipment;

    private List<FarmerContributionDto> farmers;
    private List<ProcessingStepView> processingSteps;
    private List<FarmView> farms;
}

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
class ShipmentInfo {
    private String containerNo;
    private String billOfLading;
    private String vesselName;
    private String destinationCountry;
    private String departureDate;
    private String arrivalEstimate;
}

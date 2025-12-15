package com.coffeetrace.trace;

import lombok.*;

import java.util.UUID;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FarmerContributionDto {
    private UUID farmerId;
    private String farmerName;
    private String region;
    private String zone;
    private String woreda;
    private String kebele;
    private Double totalCherryKg;
    private Double sharePercent;
    private Integer farmCount;
    private String photoUrl;
}

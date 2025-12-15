package com.coffeetrace.exporter;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateShipmentRequest {
    private String exportLotId;
    private String containerNo;
    private String billOfLading;
    private String vesselName;
    private String destinationCountry;
    private String departureDate;
    private String arrivalEstimate;
}

package com.coffeetrace.processing.dto;


import java.time.LocalDate;
import java.util.UUID;

public class ShipmentCreateRequest {

    private UUID exportLotId;
    private UUID exporterId;         // Actor that ships

    private String containerNo;
    private String billOfLading;
    private String vesselName;
    private String destinationCountry;
    private LocalDate departureDate;
    private LocalDate arrivalEstimate;

    // getters & setters …


    public UUID getExportLotId() {
        return exportLotId;
    }

    public void setExportLotId(UUID exportLotId) {
        this.exportLotId = exportLotId;
    }

    public UUID getExporterId() {
        return exporterId;
    }

    public void setExporterId(UUID exporterId) {
        this.exporterId = exporterId;
    }

    public String getContainerNo() {
        return containerNo;
    }

    public void setContainerNo(String containerNo) {
        this.containerNo = containerNo;
    }

    public String getBillOfLading() {
        return billOfLading;
    }

    public void setBillOfLading(String billOfLading) {
        this.billOfLading = billOfLading;
    }

    public String getVesselName() {
        return vesselName;
    }

    public void setVesselName(String vesselName) {
        this.vesselName = vesselName;
    }

    public String getDestinationCountry() {
        return destinationCountry;
    }

    public void setDestinationCountry(String destinationCountry) {
        this.destinationCountry = destinationCountry;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getArrivalEstimate() {
        return arrivalEstimate;
    }

    public void setArrivalEstimate(LocalDate arrivalEstimate) {
        this.arrivalEstimate = arrivalEstimate;
    }
}


package com.coffeetrace.processing.dto;


import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Data
public class BatchCreateRequest {

    private UUID stationId;
    private String batchCode;
    private String processType;

    private LocalDate fermentationStart;
    private LocalDate fermentationEnd;
    private LocalDate dryingStart;
    private LocalDate dryingEnd;

    private Double totalCherryKg;
    private Double parchmentKg;

    private List<UUID> deliveryIds;

    public UUID getStationId() {
        return stationId;
    }

    public void setStationId(UUID stationId) {
        this.stationId = stationId;
    }

    public String getBatchCode() {
        return batchCode;
    }

    public void setBatchCode(String batchCode) {
        this.batchCode = batchCode;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public LocalDate getFermentationStart() {
        return fermentationStart;
    }

    public void setFermentationStart(LocalDate fermentationStart) {
        this.fermentationStart = fermentationStart;
    }

    public LocalDate getFermentationEnd() {
        return fermentationEnd;
    }

    public void setFermentationEnd(LocalDate fermentationEnd) {
        this.fermentationEnd = fermentationEnd;
    }

    public LocalDate getDryingStart() {
        return dryingStart;
    }

    public void setDryingStart(LocalDate dryingStart) {
        this.dryingStart = dryingStart;
    }

    public LocalDate getDryingEnd() {
        return dryingEnd;
    }

    public void setDryingEnd(LocalDate dryingEnd) {
        this.dryingEnd = dryingEnd;
    }

    public Double getTotalCherryKg() {
        return totalCherryKg;
    }

    public void setTotalCherryKg(Double totalCherryKg) {
        this.totalCherryKg = totalCherryKg;
    }

    public Double getParchmentKg() {
        return parchmentKg;
    }

    public void setParchmentKg(Double parchmentKg) {
        this.parchmentKg = parchmentKg;
    }

    public List<UUID> getDeliveryIds() {
        return deliveryIds;
    }

    public void setDeliveryIds(List<UUID> deliveryIds) {
        this.deliveryIds = deliveryIds;
    }
}

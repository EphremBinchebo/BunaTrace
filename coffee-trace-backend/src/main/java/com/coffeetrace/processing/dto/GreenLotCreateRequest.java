package com.coffeetrace.processing.dto;


import java.util.UUID;

public class GreenLotCreateRequest {

    private String lotCode;          // e.g. "GUJI-2025-0009"
    private UUID dryMillBatchId;     // DryMillBatch id
    private Double totalGreenKg;
    private String grade;
    private String processingType;   // "WASHED", ...

    // getters & setters …


    public String getLotCode() {
        return lotCode;
    }

    public void setLotCode(String lotCode) {
        this.lotCode = lotCode;
    }

    public UUID getDryMillBatchId() {
        return dryMillBatchId;
    }

    public void setDryMillBatchId(UUID dryMillBatchId) {
        this.dryMillBatchId = dryMillBatchId;
    }

    public Double getTotalGreenKg() {
        return totalGreenKg;
    }

    public void setTotalGreenKg(Double totalGreenKg) {
        this.totalGreenKg = totalGreenKg;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getProcessingType() {
        return processingType;
    }

    public void setProcessingType(String processingType) {
        this.processingType = processingType;
    }
}

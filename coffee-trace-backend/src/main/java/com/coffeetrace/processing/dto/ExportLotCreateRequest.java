package com.coffeetrace.processing.dto;


import java.time.LocalDate;
import java.util.UUID;

public class ExportLotCreateRequest {

    private String exportCode;       // e.g. "EXP-GUJI-2025-0009"
    private String greenLotId;
    private UUID exporterId;         // Actor (EXPORTER)

    private Integer bagCount;
    private Integer bagWeightKg;
    private String ecxCode;
    private String exportLicense;
    private LocalDate packingDate;

    // getters & setters …


    public String getExportCode() {
        return exportCode;
    }

    public void setExportCode(String exportCode) {
        this.exportCode = exportCode;
    }

    public String getGreenLotId() {
        return greenLotId;
    }

    public void setGreenLotId(String greenLotId) {
        this.greenLotId = greenLotId;
    }

    public UUID getExporterId() {
        return exporterId;
    }

    public void setExporterId(UUID exporterId) {
        this.exporterId = exporterId;
    }

    public Integer getBagCount() {
        return bagCount;
    }

    public void setBagCount(Integer bagCount) {
        this.bagCount = bagCount;
    }

    public Integer getBagWeightKg() {
        return bagWeightKg;
    }

    public void setBagWeightKg(Integer bagWeightKg) {
        this.bagWeightKg = bagWeightKg;
    }

    public String getEcxCode() {
        return ecxCode;
    }

    public void setEcxCode(String ecxCode) {
        this.ecxCode = ecxCode;
    }

    public String getExportLicense() {
        return exportLicense;
    }

    public void setExportLicense(String exportLicense) {
        this.exportLicense = exportLicense;
    }

    public LocalDate getPackingDate() {
        return packingDate;
    }

    public void setPackingDate(LocalDate packingDate) {
        this.packingDate = packingDate;
    }
}


package com.coffeetrace.processing.dto;

import java.time.LocalDate;
import java.util.UUID;

public class DryMillBatchCreateRequest {

    private UUID dryMillId;      // Actor (DRYING_STATION / DRY_MILL)
    private UUID batchId;        // parchment Batch id

    private LocalDate millingDate;
    private Double inputParchmentKg;
    private Double outputGreenKg;
    private Double moisturePercent;
    private Integer defectCount;
    private Integer screenSize;
    private String grade;

    public UUID getDryMillId() {
        return dryMillId;
    }

    public void setDryMillId(UUID dryMillId) {
        this.dryMillId = dryMillId;
    }

    public UUID getBatchId() {
        return batchId;
    }

    public void setBatchId(UUID batchId) {
        this.batchId = batchId;
    }

    public LocalDate getMillingDate() {
        return millingDate;
    }

    public void setMillingDate(LocalDate millingDate) {
        this.millingDate = millingDate;
    }

    public Double getInputParchmentKg() {
        return inputParchmentKg;
    }

    public void setInputParchmentKg(Double inputParchmentKg) {
        this.inputParchmentKg = inputParchmentKg;
    }

    public Double getOutputGreenKg() {
        return outputGreenKg;
    }

    public void setOutputGreenKg(Double outputGreenKg) {
        this.outputGreenKg = outputGreenKg;
    }

    public Double getMoisturePercent() {
        return moisturePercent;
    }

    public void setMoisturePercent(Double moisturePercent) {
        this.moisturePercent = moisturePercent;
    }

    public Integer getDefectCount() {
        return defectCount;
    }

    public void setDefectCount(Integer defectCount) {
        this.defectCount = defectCount;
    }

    public Integer getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(Integer screenSize) {
        this.screenSize = screenSize;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    // getters & setters …
}

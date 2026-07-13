package com.coffeetrace.publicapi;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PublicTraceResponse {

    private String batchId;
    private Boolean verified;

    private UUID farmerId;
    private String farmer;

    private String farm;
    private String station;

    private String region;
    private String zone;
    private String woreda;
    private String kebele;

    private String variety;

    private String process;

    private String harvestDate;

    private Double cherryKg;

    private Double parchmentKg;

    private Integer elevation;

    private Double latitude;
    private Double longitude;

    private List<JourneyStep> journey;

    @Data
    public static class JourneyStep {
        private String label;
        private String date;

        public JourneyStep(String label, String date) {
            this.label = label;
            this.date = date;
        }
    }
}
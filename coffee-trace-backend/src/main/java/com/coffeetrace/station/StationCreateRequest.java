package com.coffeetrace.station;

import lombok.Data;

@Data
public class StationCreateRequest {

    private String name;
    private String region;
    private String zone;
    private String woreda;
    private String kebele;

    private Double latitude;
    private Double longitude;
}


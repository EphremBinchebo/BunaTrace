package com.coffeetrace.farms.dto;

import lombok.Data;

@Data
public class FarmUpdateRequest {

    private String name;

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    private Double areaHectares;

    private Integer elevation;

    private String variety;

    private Integer plantingYear;

    private Boolean organic;

    private String certification;

    private String polygon;

    private String photoUrl;

    private String notes;

    private Boolean active;
}
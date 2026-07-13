package com.coffeetrace.farms.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class FarmCreateRequest {

    private UUID farmerId;

    private String name;

    /*
     * Location
     */

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    /*
     * Coffee Information
     */

    private Double areaHectares;

    private Integer elevation;

    private String variety;

    private Integer plantingYear;

    /*
     * Certification
     */

    private Boolean organic;

    private String certification;

    /*
     * Media
     */

    private String polygon;

    private String photoUrl;

    /*
     * Notes
     */

    private String notes;
}
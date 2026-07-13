package com.coffeetrace.users.dto;

import lombok.Data;

@Data
public class ActorUpdateRequest {

    private String name;

    private String phone;

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    private String photoUrl;

    private Boolean active;

}
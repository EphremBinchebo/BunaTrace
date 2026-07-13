package com.coffeetrace.users.dto;

import com.coffeetrace.users.ActorType;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ActorResponse {

    private UUID id;

    private String name;

    private ActorType type;

    private String phone;

    private String country;

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    private String photoUrl;

    private Boolean active;

}
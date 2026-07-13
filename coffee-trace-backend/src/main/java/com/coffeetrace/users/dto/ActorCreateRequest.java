package com.coffeetrace.users.dto;

import com.coffeetrace.users.ActorType;
import lombok.Data;

@Data
public class ActorCreateRequest {

    private String name;

    private ActorType type;

    private String phone;

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    private String photoUrl;

}
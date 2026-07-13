package com.coffeetrace.farms;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmRequest {

    private UUID farmerId;

    private String name;
    private Double areaHa;
    private Integer elevationM;

    private String region;
    private String zone;
    private String woreda;
    private String kebele;
}



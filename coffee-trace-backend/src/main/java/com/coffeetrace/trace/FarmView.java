package com.coffeetrace.trace;

import lombok.*;

import java.util.UUID;

//@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
//public class FarmView {
//    private UUID farmId;
//    private UUID farmerId;
//    private String farmerName;
//    private String geomGeoJson;
//    private String variety;
//    private Integer elevationMasl;
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//}

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmView {

    private UUID farmId;
    private UUID farmerId;

    private String farmerName;

    private String geomGeoJson;

   private String variety;

    private Integer elevationM;

    private Double areaHa;    // <-- ADD THIS FIELD

    private String region;
    private String zone;
    private String woreda;
    private String kebele;

    private String photoUrl;
}


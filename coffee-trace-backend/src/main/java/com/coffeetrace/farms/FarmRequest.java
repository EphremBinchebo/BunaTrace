package com.coffeetrace.farms;



import com.coffeetrace.users.Actor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class FarmRequest {
//
//    private UUID farmerId;     // <-- ADD THIS
//
//    private String name;
//    private Double areaHa;
//    private String geoJson;
//
//    // Optional
//    private String woreda;
//    private String kebele;
//
//    public UUID getFarmerId() {
//        return farmerId;
//    }
//
//    public void setFarmerId(UUID farmerId) {
//        this.farmerId = farmerId;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Double getAreaHa() {
//        return areaHa;
//    }
//
//    public void setAreaHa(Double areaHa) {
//        this.areaHa = areaHa;
//    }
//
//    public String getGeoJson() {
//        return geoJson;
//    }
//
//    public void setGeoJson(String geoJson) {
//        this.geoJson = geoJson;
//    }
//
//    public String getWoreda() {
//        return woreda;
//    }
//
//    public void setWoreda(String woreda) {
//        this.woreda = woreda;
//    }
//
//    public String getKebele() {
//        return kebele;
//    }
//
//    public void setKebele(String kebele) {
//        this.kebele = kebele;
//    }
//}

//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class FarmRequest {
//
//    private UUID farmerId;  // REQUIRED
//
//    private String name;
//    private Double areaHa;
//    private String geoJson;
//
//    private String woreda;
//    private String kebele;
//}

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



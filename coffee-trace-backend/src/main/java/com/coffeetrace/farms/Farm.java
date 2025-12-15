package com.coffeetrace.farms;


import com.coffeetrace.users.Actor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;


//@Entity
//@Table(name = "farm")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class Farm {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private String id;
//
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "farmer_id")   // ✅ FK column in DB
//    private Actor farmer;
//
//    private String name;
//    private Double areaHa;
//    private String woreda;
//    private String kebele;
//
////    @Column(columnDefinition = "text")
////    private String geomJson;
//
//    @Column(columnDefinition = "text")
//    private String geomGeoJson; // farm polygon (GeoJSON text)
//
//    private Integer elevationMasl;
//    private String variety;
//    private String photoUrl;
//}
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Farm {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Actor farmer;

    private String name;

    private Double areaHa;
    private Integer elevationM;
    private String region;
    private String zone;
    private String woreda;
    private String kebele;
    private String variety;

    private String geomGeoJson;   // ← ADD THIS FIELD
}

//@Entity
//@Table(name = "farm")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor @Builder
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class Farm {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "farmer_id")
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})   // Important
//    private Actor farmer;
//
//    private String name;
//    private Double areaHa;
//    private Integer elevationM;
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//    private String variety;
//}


//@Entity
//@Table(name = "farm")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor @Builder
//public class Farm {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "farmer_id")
//    private Actor farmer;
//
//    private String name;
//
//    private Double areaHa;
//    private Integer elevationM;
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//    private String variety;
//    private String geomGeoJson;
//
//}



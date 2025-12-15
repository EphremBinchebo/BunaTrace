package com.coffeetrace.users;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;   // <-- Manual UUID only, do NOT generate

    private String name;

    @Enumerated(EnumType.STRING)
    private ActorType type;

    private String region;
    private String zone;
    private String woreda;
    private String kebele;
    private Double latitude;
    private Double longitude;
    private String photoUrl;
}

//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class Actor {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(columnDefinition = "BINARY(16)")
//    private UUID id;
//
//    private String name;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type;
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//
//    private Double latitude;
//    private Double longitude;
//
//    private String photoUrl;
//}

//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@Entity
//public class Actor {
//
////    @Id
////    @GeneratedValue(strategy = GenerationType.UUID)
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    @Column(columnDefinition = "BINARY(16)")
//    private UUID id;
//
//    private String name;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type;
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//
//    private Double latitude;   // ← ADD THIS
//    private Double longitude;  // ← ADD THIS
//    private String photoUrl;
//
//    public String getPhotoUrl() {
//        return photoUrl;
//    }
//}

//@Entity
//@Table(name = "actor")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor @Builder
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class Actor {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    private String name;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type;
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//    private String phone;
//    private String photoUrl;
//
//    public String getPhotoUrl() {
//        return photoUrl;
//    }
//}


//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@Table(name = "actor")
//public class Actor {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private String id;
//
//    private String name;
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//
//    private String phone;
//    private String photoUrl;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type;
//
//    // NEW field
//    private Double latitude;
//    private Double longitude;
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
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
//    public String getRegion() {
//        return region;
//    }
//
//    public void setRegion(String region) {
//        this.region = region;
//    }
//
//    public String getZone() {
//        return zone;
//    }
//
//    public void setZone(String zone) {
//        this.zone = zone;
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
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public ActorType getType() {
//        return type;
//    }
//
//    public void setType(ActorType type) {
//        this.type = type;
//    }
//
//    public Double getLatitude() {
//        return latitude;
//    }
//
//    public void setLatitude(Double latitude) {
//        this.latitude = latitude;
//    }
//
//    public Double getLongitude() {
//        return longitude;
//    }
//
//    public void setLongitude(Double longitude) {
//        this.longitude = longitude;
//    }
//
//    public String getPhotoUrl() {
//        return photoUrl;
//    }
//
//    public void setPhotoUrl(String photoUrl) {
//        this.photoUrl = photoUrl;
//    }
//}

//@Entity
//@Table(name = "actor")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor @Builder
//public class Actor {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    private String name;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type;
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//
//    private String phone;
//
//    private Double latitude;   // <-- ADD
//    private Double longitude;  // <-- ADD
//
//    private String photoUrl;
//}

//@Entity
//@Table(name = "actor")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor @Builder
//public class Actor {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    private String name;
//
//    @Enumerated(EnumType.STRING)
//    private ActorType type; // FARMER, COOP, EXPORTER...
//
//    private String region;
//    private String zone;
//    private String woreda;
//    private String kebele;
//
//    private String phone;
//    String photoUrl;
//
//    public String getPhotoUrl() {
//        return photoUrl;
//    }
//
//}

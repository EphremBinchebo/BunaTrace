package com.coffeetrace.batch;

import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.users.Actor;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)   // Auto-generate UUID
    private UUID id;

    private String batchCode;
    private String processType;

    private LocalDate fermentationStart;
    private LocalDate fermentationEnd;

    private LocalDate dryingStart;
    private LocalDate dryingEnd;

    private Double totalCherryKg;
    private Double parchmentKg;

    private String status;

    @Column(name = "qr_code", unique = true)
    private String qrCode;   // QR Code string

    @ManyToOne
    @JoinColumn(name = "station_id")
    private Actor station;   // Washing station

    @OneToMany(mappedBy = "batch")
    private List<FarmerDelivery> deliveries; // Assigned deliveries

    private LocalDate createdAt;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getBatchCode() {
        return batchCode;
    }

    public void setBatchCode(String batchCode) {
        this.batchCode = batchCode;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public LocalDate getFermentationStart() {
        return fermentationStart;
    }

    public void setFermentationStart(LocalDate fermentationStart) {
        this.fermentationStart = fermentationStart;
    }

    public LocalDate getFermentationEnd() {
        return fermentationEnd;
    }

    public void setFermentationEnd(LocalDate fermentationEnd) {
        this.fermentationEnd = fermentationEnd;
    }

    public LocalDate getDryingStart() {
        return dryingStart;
    }

    public void setDryingStart(LocalDate dryingStart) {
        this.dryingStart = dryingStart;
    }

    public LocalDate getDryingEnd() {
        return dryingEnd;
    }

    public void setDryingEnd(LocalDate dryingEnd) {
        this.dryingEnd = dryingEnd;
    }

    public Double getTotalCherryKg() {
        return totalCherryKg;
    }

    public void setTotalCherryKg(Double totalCherryKg) {
        this.totalCherryKg = totalCherryKg;
    }

    public Double getParchmentKg() {
        return parchmentKg;
    }

    public void setParchmentKg(Double parchmentKg) {
        this.parchmentKg = parchmentKg;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public Actor getStation() {
        return station;
    }

    public void setStation(Actor station) {
        this.station = station;
    }

    public List<FarmerDelivery> getDeliveries() {
        return deliveries;
    }

    public void setDeliveries(List<FarmerDelivery> deliveries) {
        this.deliveries = deliveries;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}



//@Entity
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//public class Batch {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    private String batchCode;
//    private String processType;
//
//    private LocalDate fermentationStart;
//    private LocalDate fermentationEnd;
//
//    private LocalDate dryingStart;
//    private LocalDate dryingEnd;
//
//    private Double totalCherryKg;
//    private Double parchmentKg;
//
//    private String status;
//
//    @Column(name = "qr_code")
//    private String qrCode;   // ✅ ADD THIS FIELD
//
//    @ManyToOne
//    private Actor station;
//
//    @OneToMany(mappedBy = "batch")
//    private List<FarmerDelivery> deliveries;
//
//    private LocalDate createdAt;
//}

//import com.coffeetrace.users.Actor;
//import com.coffeetrace.deliveries.FarmerDelivery;
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.UUID;
//
//@Entity
//@Builder
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Batch {
//
//    @Id
//    @Column(columnDefinition = "BINARY(16)")
//    private UUID id;
//
//    private String batchCode;
//
//    @ManyToOne
//    private Actor station;
//
//    private String processType;
//
//    private LocalDate fermentationStart;
//    private LocalDate fermentationEnd;
//    private LocalDate dryingStart;
//    private LocalDate dryingEnd;
//
//    private Double totalCherryKg;
//    private Double parchmentKg;
//
//    @OneToMany
//    private List<FarmerDelivery> deliveries;
//
//    private String status;
//
//    private LocalDate createdAt;   // ← also LocalDate (not LocalDateTime)
//}


//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class Batch {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
//    private UUID id;
//
//    @Column(unique = true, nullable = false)
//    private String batchCode;
//
//    private String qrCode;
//
//    private String status;  // CREATED, WASHING, DRYING, READY, EXPORTED
//
//    private double totalCherryKg;
//
//    private double parchmentKg;   // <── REQUIRED
//
//    private String processType;   // NATURAL, WASHED, HONEY
//
//    private LocalDate fermentationStart;   // <── REQUIRED
//    private LocalDate fermentationEnd;
//
//    private LocalDate dryingStart;         // <── REQUIRED
////    private LocalDate dryingEnd;
//    private LocalDateTime dryingEnd;
//
//
//    @ManyToOne
//    private Actor station;                 // Washing / Processing station
//
//    @OneToMany(mappedBy = "batch", cascade = CascadeType.ALL)
//    private List<FarmerDelivery> deliveries;
//
//}

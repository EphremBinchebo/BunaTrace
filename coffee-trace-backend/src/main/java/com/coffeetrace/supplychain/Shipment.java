package com.coffeetrace.supplychain;

import com.coffeetrace.users.Actor;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Shipment {

//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
   @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(optional = false)
    private Actor exporter;

//    @ManyToOne(optional = false)
    @ManyToOne
    @JoinColumn(name = "export_lot_id", columnDefinition = "BINARY(16)")
    private ExportLot exportLot;

    private String containerNo;
    private String billOfLading;
    private String vesselName;
    private String destinationCountry;
    private LocalDate departureDate;
    private LocalDate arrivalEstimate;
}

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
public class ExportLot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne(optional = false)
    private GreenLot greenLot;

    @ManyToOne(optional = false)
    private Actor exporter;

    @Column(nullable = false, unique = true)
    private String exportCode;

    private Integer bagCount;
    private Integer bagWeightKg;
    private String ecxCode;
    private String exportLicense;
    private LocalDate packingDate;
}

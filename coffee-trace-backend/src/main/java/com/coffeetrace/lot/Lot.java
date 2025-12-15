package com.coffeetrace.lot;

import com.coffeetrace.batch.Batch;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "lot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String lotCode;        // e.g. CT-LOT-2025-A1

    private double netGreenKg;     // weight after hulling/drying
    private String grade;          // G1, G2, etc.
    private String warehouse;      // where it's stored

    @Column(unique = true)
    private String qrCode;         // exporter QR

    @OneToOne
    @JoinColumn(name = "batch_id")
    private Batch batch;           // source batch
}
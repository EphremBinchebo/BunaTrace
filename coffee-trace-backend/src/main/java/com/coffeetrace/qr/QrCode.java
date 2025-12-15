package com.coffeetrace.qr;

import com.coffeetrace.supplychain.ExportLot;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class QrCode {

//    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

//    @ManyToOne(optional = false)

    @ManyToOne
    @JoinColumn(name = "export_lot_id", columnDefinition = "BINARY(16)")
    private ExportLot exportLot;

    @Column(nullable = false, unique = true)
    private String urlToken;

    private LocalDateTime createdAt;

    public ExportLot getExportLot() {
        return null;
    }
}

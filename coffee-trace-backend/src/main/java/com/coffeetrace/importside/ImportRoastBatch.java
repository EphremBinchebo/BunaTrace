package com.coffeetrace.importside;

import com.coffeetrace.supplychain.ExportLot;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImportRoastBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    private ExportLot exportLot;

    private String roasterName;
    private String roasteryCountry;
    private String batchCode;
    private LocalDate roastDate;
    private String profile;
    private Double greenInputKg;
    private Double roastedOutputKg;
}

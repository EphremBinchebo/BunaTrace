package com.coffeetrace.importside;

import jakarta.persistence.*;
import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class ImportProduct {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    private ImportRoastBatch roastBatch;

    private String sku;
    private String name;
    private Integer bagWeightG;
    private String marketCountry;
}

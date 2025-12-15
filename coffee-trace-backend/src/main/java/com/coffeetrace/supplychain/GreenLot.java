package com.coffeetrace.supplychain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GreenLot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String lotCode;

    private Double totalGreenKg;
    private String grade;
    private String processingType;



    @ManyToMany
    @JoinTable(
            name = "greenlot_drymillbatch",
            joinColumns = @JoinColumn(name = "greenlot_id"),
            inverseJoinColumns = @JoinColumn(name = "drymillbatch_id")
    )
    @Builder.Default
    private List<DryMillBatch> millBatches = new ArrayList<>();
}

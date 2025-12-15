package com.coffeetrace.supplychain;

import com.coffeetrace.users.Actor;
import com.coffeetrace.batch.Batch;
import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DryMillBatch {

    @Id
    @Column(length = 36, nullable = false)
    private String id;   // <-- store UUID as String (matches VARCHAR in DB)

    @ManyToOne(optional = false)
    @JoinColumn(name = "dry_mill_id", nullable = false)
    private Actor dryMill;

    @ManyToOne(optional = false)
    @JoinColumn(name = "parchment_batch_id", nullable = false)
    private Batch parchmentBatch;

    private LocalDate millingDate;
    private Double inputParchmentKg;
    private Double outputGreenKg;
    private Double moisturePercent;
    private Integer defectCount;
    private Integer screenSize;
    private String grade;

    @PrePersist
    public void ensureId() {
        // Generate a UUID string if id is not already set
        if (this.id == null || this.id.isBlank()) {
            this.id = UUID.randomUUID().toString();
        }
    }
}


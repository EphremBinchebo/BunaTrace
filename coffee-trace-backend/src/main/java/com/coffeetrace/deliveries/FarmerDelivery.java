package com.coffeetrace.deliveries;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.farms.Farm;
import com.coffeetrace.users.Actor;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmerDelivery {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private Actor farmer;

    @ManyToOne
    private Farm farm;

    @ManyToOne
    private Actor washingStation;

    private Double cherryKg;
    private String receiptNumber;

    private String notes;

    private LocalDateTime deliveryTime;

    @ManyToOne
    @JoinColumn(name = "batch_id", columnDefinition = "BINARY(16)")
    private Batch batch;
}


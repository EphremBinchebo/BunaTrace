package com.coffeetrace.deliveries;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FarmerDeliveryView {

    private String id;

    private String farmerName;
    private String farmName;
    private String washingStationName;

    private Double cherryKg;
    private String receiptNumber;
    private String notes;

    private LocalDateTime deliveryTime;

    private String batchId;

    public static FarmerDeliveryView from(FarmerDelivery d) {
        return FarmerDeliveryView.builder()
                .id(d.getId().toString())
                .farmerName(d.getFarmer() != null ? d.getFarmer().getName() : null)
                .farmName(d.getFarm() != null ? d.getFarm().getName() : null)
                .washingStationName(
                        d.getWashingStation() != null ? d.getWashingStation().getName() : null
                )
                .cherryKg(d.getCherryKg())
                .receiptNumber(d.getReceiptNumber())
                .notes(d.getNotes())
                .deliveryTime(d.getDeliveryTime())
                .batchId(d.getBatch() != null ? d.getBatch().getId().toString() : null)
                .build();
    }
}

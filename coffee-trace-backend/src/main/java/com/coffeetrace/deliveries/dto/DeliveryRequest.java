package com.coffeetrace.deliveries.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class DeliveryRequest {

    private UUID farmerId;
    private UUID farmId;
    private UUID stationId;

    private Double cherryKg;
    private String receiptNumber;
    private String notes;   // optional notes
}

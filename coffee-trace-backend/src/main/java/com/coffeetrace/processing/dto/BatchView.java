package com.coffeetrace.processing.dto;


import java.time.LocalDate;
import java.util.UUID;


import com.coffeetrace.batch.Batch;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchView {

    private String id;
    private String batchCode;
    private String processType;

    private String fermentationStart;
    private String fermentationEnd;
    private String dryingStart;
    private String dryingEnd;

    private Double totalCherryKg;
    private Double parchmentKg;

    private String status;
    private String qrCode;

    private String stationName;

    public static BatchView from(Batch b) {
        return BatchView.builder()
                .id(b.getId().toString())
                .batchCode(b.getBatchCode())
                .processType(b.getProcessType())
                .fermentationStart(b.getFermentationStart() != null ? b.getFermentationStart().toString() : null)
                .fermentationEnd(b.getFermentationEnd() != null ? b.getFermentationEnd().toString() : null)
                .dryingStart(b.getDryingStart() != null ? b.getDryingStart().toString() : null)
                .dryingEnd(b.getDryingEnd() != null ? b.getDryingEnd().toString() : null)
                .totalCherryKg(b.getTotalCherryKg())
                .parchmentKg(b.getParchmentKg())
                .status(b.getStatus())
                .qrCode(b.getQrCode())
                .stationName(b.getStation() != null ? b.getStation().getName() : null)
                .build();
    }
}


//
//public class BatchView {
//
//    private UUID id;
//    private String batchCode;
//    private String processType;
//    private String stationName;
//    private Double totalCherryKg;
//    private Double parchmentKg;
//    private LocalDate fermentationStart;
//    private LocalDate fermentationEnd;
//    private LocalDate dryingStart;
//    private LocalDate dryingEnd;
//    private String status;
//
//    // getters & setters …
//    // (generate with IDE)
//}

package com.coffeetrace.exporter;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateExportLotRequest {
    private String greenLotId;
    private String exportCode;
    private Integer bagCount;
    private Integer bagWeightKg;
    private String ecxCode;
    private String exportLicense;
}

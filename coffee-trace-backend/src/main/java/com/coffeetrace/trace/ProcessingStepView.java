package com.coffeetrace.trace;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProcessingStepView {
    private String type;
    private String actorName;
    private String actorType;
    private String date;
    private String description;
}

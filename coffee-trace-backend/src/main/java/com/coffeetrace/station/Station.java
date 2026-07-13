package com.coffeetrace.station;


import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "stations")   // 👈 IMPORTANT: Create table name
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Station {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    private String name;
    private String region;
    private String zone;
    private String woreda;
    private String kebele;
    private Double latitude;
    private Double longitude;

    private String photoUrl;


    private String type;  // WASHING_STATION, etc.
}

package com.coffeetrace.farms;

import com.coffeetrace.users.Actor;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "farms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(length = 36, nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Actor farmer;

    /*
     * Location
     */

    @Builder.Default
    private String country = "Ethiopia";

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    private Double latitude;

    private Double longitude;

    /*
     * Coffee Information
     */

    private Double areaHectares;

    private Integer elevation;

    private String variety;

    private Integer plantingYear;

    /*
     * Certification
     */

    @Builder.Default
    private Boolean organic = false;

    private String certification;

    /*
     * Media
     */

    @Lob
    private String polygon;

    private String photoUrl;

    /*
     * Notes
     */

    @Column(length = 2000)
    private String notes;

    @Builder.Default
    private Boolean active = true;


}
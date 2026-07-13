package com.coffeetrace.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "actors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(length = 36, nullable = false, updatable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActorType type;

    @Builder.Default
    private Boolean active = true;

    // Country

    @Builder.Default
    private String country = "Ethiopia";

    // Administrative Location

    private String region;

    private String zone;

    private String woreda;

    private String kebele;

    // Optional Contact

    private String phone;

    // GPS

    private Double latitude;

    private Double longitude;

    // Profile Photo

    private String photoUrl;

}

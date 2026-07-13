package com.coffeetrace.platform.common;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public abstract class BusinessObject extends BaseEntity {

    private String businessCode;

    @Enumerated(EnumType.STRING)
    private Status status;

}
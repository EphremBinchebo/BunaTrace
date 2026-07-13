package com.coffeetrace.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long farmers;

    private long farms;

    private long stations;

    private long deliveries;

    private long batches;

    private double totalCherryKg;
}
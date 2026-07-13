package com.coffeetrace.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {

    private long farmers;

    private long farms;
    private long stations;

    private long deliveries;

    private long batches;

}
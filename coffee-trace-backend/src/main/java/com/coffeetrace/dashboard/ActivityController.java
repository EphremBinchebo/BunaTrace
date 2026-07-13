package com.coffeetrace.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;
    private final DashboardService dashboardService;

    @GetMapping
    public List<ActivityLog> latest() {
        return activityService.latest();
    }

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {

        return dashboardService.getStats();
    }

}
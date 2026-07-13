package com.coffeetrace.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository repository;

    public void log(
            String title,
            String description,
            String type,
            String status
    ) {

        repository.save(
                ActivityLog.builder()
                        .title(title)
                        .description(description)
                        .type(type)
                        .status(status)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    public List<ActivityLog> latest() {
        return repository.findTop20ByOrderByCreatedAtDesc();
    }

}
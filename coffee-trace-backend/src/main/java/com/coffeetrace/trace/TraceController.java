package com.coffeetrace.trace;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trace")
public class TraceController {

    private final TraceabilityService traceService;

    public TraceController(TraceabilityService traceService) {
        this.traceService = traceService;
    }

    @GetMapping("/export/{exportCode}")
    public ResponseEntity<ExportTraceDto> traceByExport(@PathVariable String exportCode) {
        return ResponseEntity.ok(traceService.traceByExportCode(exportCode));
    }
}

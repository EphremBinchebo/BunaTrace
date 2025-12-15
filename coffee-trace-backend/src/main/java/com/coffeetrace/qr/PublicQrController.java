package com.coffeetrace.qr;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.processing.BatchWorkflowService;
import com.coffeetrace.processing.dto.BatchView;
import com.coffeetrace.trace.ExportTraceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/qr")
public class PublicQrController {

    private final QrTraceService qrTraceService;

    private final BatchWorkflowService workflowService;

    @Autowired
    public PublicQrController(QrTraceService qrTraceService, BatchWorkflowService workflowService) {
        this.qrTraceService = qrTraceService;
        this.workflowService = workflowService;
    }

    @GetMapping("/{token}")
    public ResponseEntity<ExportTraceDto> getTrace(@PathVariable String token) {
        return ResponseEntity.ok(qrTraceService.getTraceByToken(token));
    }

    @GetMapping("/qr/{qrCode}")
    public ResponseEntity<BatchView> getByQr(@PathVariable String qrCode) {

        Batch b = workflowService.getBatchByQrCode(qrCode);
        return ResponseEntity.ok(BatchView.from(b));
    }

}

package com.coffeetrace.qr;

import com.coffeetrace.supplychain.ExportLot;
import com.coffeetrace.trace.ExportTraceDto;
import com.coffeetrace.trace.TraceabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class QrTraceService {

    private final QrCodeRepository qrRepo;
    private final TraceabilityService traceService;

    public QrTraceService(QrCodeRepository qrRepo, TraceabilityService traceService) {
        this.qrRepo = qrRepo;
        this.traceService = traceService;
    }

    public ExportTraceDto getTraceByToken(String token) {
        QrCode qr = qrRepo.findByUrlToken(token)
                .orElseThrow(() -> new RuntimeException("QR token not found: " + token));
        ExportLot exportLot = qr.getExportLot();
        return traceService.traceByExportCode(exportLot.getExportCode());
    }
}

package com.coffeetrace.exporter;

import com.coffeetrace.supplychain.ExportLot;
import com.coffeetrace.supplychain.GreenLot;
import com.coffeetrace.supplychain.GreenLotRepository;
import com.coffeetrace.supplychain.Shipment;
import com.coffeetrace.supplychain.ExportLotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exporter")
@RequiredArgsConstructor
public class ExporterController {

    private final GreenLotRepository greenRepo;
    private final ExportLotRepository exportRepo;
    private final ExporterService exporterService;

    @GetMapping("/green-lots")
    public ResponseEntity<List<GreenLot>> listGreenLots() {
        return ResponseEntity.ok(greenRepo.findAll());
    }

    @GetMapping("/export-lots")
    public ResponseEntity<List<ExportLot>> listExportLots() {
        return ResponseEntity.ok(exportRepo.findAll());
    }

    @PostMapping("/export-lots")
    public ResponseEntity<ExportLot> createExportLot(@RequestBody CreateExportLotRequest req) {
        // For MVP, use first exporter actor; later map to logged-in user
        UUID exporterActorId = greenRepo.findAll().stream()
                .findFirst()
                .map(gl -> gl.getMillBatches().get(0).getDryMill().getId()) // not ideal; you can adjust
                .orElseThrow();
        ExportLot lot = exporterService.createExportLot(req, exporterActorId);
        return ResponseEntity.ok(lot);
    }

    @PostMapping("/shipments")
    public ResponseEntity<Shipment> createShipment(@RequestBody CreateShipmentRequest req) {
        return ResponseEntity.ok(exporterService.createShipment(req));
    }

//    @PostMapping("/export-lots/{exportLotId}/qr")
//    public ResponseEntity<String> generateQr(@PathVariable String exportLotId) {
//        return ResponseEntity.ok(exporterService.generateQrForExportLot(exportLotId));
//    }
@PostMapping("/export-lots/{exportLotId}/qr")
public ResponseEntity<String> generateQr(@PathVariable UUID exportLotId) {
    return ResponseEntity.ok(exporterService.generateQrForExportLot(exportLotId));
}
}

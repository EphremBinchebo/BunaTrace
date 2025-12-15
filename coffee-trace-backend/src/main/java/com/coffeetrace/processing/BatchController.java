package com.coffeetrace.processing;

import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.deliveries.FarmerDeliveryRepository;
import com.coffeetrace.processing.dto.BatchCreateRequest;
import com.coffeetrace.processing.dto.BatchView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/batches")
@RequiredArgsConstructor
public class BatchController {

    private final BatchWorkflowService workflowService;
    private final BatchRepository batchRepo;
    private final FarmerDeliveryRepository deliveryRepo;

    // ─────────────────────────────────────────────
    // GET ALL BATCHES
    // ─────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<BatchView>> getAll() {
        List<BatchView> batches = batchRepo.findAll()
                .stream()
                .map(BatchView::from)   // ✅ FIXED
                .toList();

        return ResponseEntity.ok(batches);
    }

    // ─────────────────────────────────────────────
    // GET BATCH BY ID
    // ─────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<BatchView> getById(@PathVariable UUID id) {
        Batch batch = batchRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        return ResponseEntity.ok(BatchView.from(batch)); // ✅ FIXED
    }

    // ─────────────────────────────────────────────
    // CREATE NEW BATCH
    // ─────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<BatchView> create(@RequestBody BatchCreateRequest req) {
        Batch created = workflowService.createBatch(req);
        return ResponseEntity.ok(BatchView.from(created)); // ✅ FIXED
    }

    // ─────────────────────────────────────────────
    // GET BATCH BY QR CODE
    // ─────────────────────────────────────────────
    @GetMapping("/qr/{qrCode}")
    public ResponseEntity<BatchView> getByQr(@PathVariable String qrCode) {
        Batch b = workflowService.getBatchByQrCode(qrCode);
        return ResponseEntity.ok(BatchView.from(b)); // already correct
    }

    @GetMapping("/station/{stationId}/available")
    public List<FarmerDelivery> availableDeliveries(@PathVariable UUID stationId) {
        return deliveryRepo.findByWashingStationIdAndBatchIsNull(stationId);
    }

}

//@RestController
//@RequestMapping("/api/batches")
//@RequiredArgsConstructor
//public class BatchController {
//
//    private final BatchWorkflowService workflowService;
//    private final BatchRepository batchRepo;
//
//
//
//    // ─────────────────────────────────────────────
//    // GET ALL BATCHES
//    // ─────────────────────────────────────────────
//    @GetMapping
//    public ResponseEntity<List<BatchView>> getAll() {
//        List<BatchView> batches = batchRepo.findAll()
//                .stream()
//                .map(BatchMapper::toView)
//                .toList();
//
//        return ResponseEntity.ok(batches);
//    }
//
//    // ─────────────────────────────────────────────
//    // GET BATCH BY ID
//    // ─────────────────────────────────────────────
//    @GetMapping("/{id}")
//    public ResponseEntity<BatchView> getById(@PathVariable UUID id) {
//        Batch batch = batchRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Batch not found"));
//
//        return ResponseEntity.ok(BatchMapper.toView(batch));
//    }
//
//    // ─────────────────────────────────────────────
//    // CREATE NEW BATCH
//    // ─────────────────────────────────────────────
//    @PostMapping
//    public ResponseEntity<BatchView> create(@RequestBody BatchCreateRequest req) {
//
//        Batch created = workflowService.createBatch(req);
//
//        return ResponseEntity.ok(BatchMapper.toView(created));
//    }
//
//    @GetMapping("/qr/{qrCode}")
//    public ResponseEntity<BatchView> getByQr(@PathVariable String qrCode) {
//        Batch b = workflowService.getBatchByQrCode(qrCode);
//        return ResponseEntity.ok(BatchView.from(b));
//    }
//
//}

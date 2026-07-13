package com.coffeetrace.farms;

import com.coffeetrace.farms.dto.FarmCreateRequest;
import com.coffeetrace.farms.dto.FarmResponse;
import com.coffeetrace.farms.dto.FarmUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/farms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FarmController {

    private final FarmService service;

    @GetMapping
    public ResponseEntity<List<FarmResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FarmResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PostMapping
    public ResponseEntity<FarmResponse> create(
            @RequestBody FarmCreateRequest request) {

        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FarmResponse> update(
            @PathVariable UUID id,
            @RequestBody FarmUpdateRequest request) {

        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
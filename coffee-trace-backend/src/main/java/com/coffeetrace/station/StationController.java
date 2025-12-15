package com.coffeetrace.station;


import com.coffeetrace.users.Actor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stations")
@RequiredArgsConstructor
public class StationController {

    private final StationService stationService;



//        @GetMapping
//        public ResponseEntity<List<Actor>> getAllStations() {
//            return ResponseEntity.ok(stationService.getAllStations());
//        }



    @GetMapping
    public ResponseEntity<List<Actor>> getAllStations() {
        return ResponseEntity.ok(stationService.getAllStations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Station> getStation(@PathVariable UUID id) {
        return ResponseEntity.ok(stationService.getStation(id));
    }

    @PostMapping
    public ResponseEntity<Station> createStation(@RequestBody Station req) {
        if (req.getId() == null) req.setId(UUID.randomUUID());
        return ResponseEntity.ok(stationService.createStation(req));
    }
}

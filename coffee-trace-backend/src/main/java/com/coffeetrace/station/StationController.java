
package com.coffeetrace.station;

import com.coffeetrace.actor.FarmerService;
import com.coffeetrace.users.Actor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StationController {

    private final StationService stationService;
    private final FarmerService farmerService;

    /**
     * Returns all washing stations for the Create Batch screen.
     *
     * GET /api/stations
     */
    @GetMapping
    public ResponseEntity<List<Actor>> getAllStations() {
        return ResponseEntity.ok(farmerService.getAllWashingStations());
    }

    /**
     * Returns one Station entity.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Station> getStation(@PathVariable UUID id) {
        return ResponseEntity.ok(stationService.getStation(id));
    }

    /**
     * Create a new station.
     */
//    @PostMapping
//    public ResponseEntity<Station> createStation(@RequestBody Station station) {
//
//        if (station.getId() == null) {
//            station.setId(UUID.randomUUID());
//        }
//
//        Station saved = stationService.createStation(station);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
//    }

    /**
     * Update station.
     */
//    @PutMapping("/{id}")
//    public ResponseEntity<Station> updateStation(
//            @PathVariable UUID id,
//            @RequestBody Station station) {
//
//        station.setId(id);
//
//        return ResponseEntity.ok(
//                stationService.updateStation(station)
//        );
//    }

    /**
     * Delete station.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStation(@PathVariable UUID id) {

        stationService.deleteStation(id);

        return ResponseEntity.noContent().build();
    }
}

//package com.coffeetrace.station;
//
//
//import com.coffeetrace.actor.FarmerService;
//import com.coffeetrace.users.Actor;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/stations")
//public class StationController {
//
//    private final StationService stationService;
//
//
//    private final FarmerService farmerService;
//
//    public StationController(StationService stationService, FarmerService farmerService) {
//        this.stationService = stationService;
//        this.farmerService = farmerService;
//    }
//
//
////    @GetMapping
////    public ResponseEntity<List<Actor>> getAllStations() {
////        return ResponseEntity.ok(stationService.getAllStations());
////    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Station> getStation(@PathVariable UUID id) {
//        return ResponseEntity.ok(stationService.getStation(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<Station> createStation(@RequestBody Station req) {
//        if (req.getId() == null) req.setId(UUID.randomUUID());
//        return ResponseEntity.ok(stationService.createStation(req));
//    }
//
//
//
//    @GetMapping
//    public ResponseEntity<List<Actor>> getAllWashingStations() {
//        return ResponseEntity.ok(farmerService.getAllWashingStations());
//    }
//}

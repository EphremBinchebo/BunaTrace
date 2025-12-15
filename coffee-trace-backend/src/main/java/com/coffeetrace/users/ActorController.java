
package com.coffeetrace.users;

import com.coffeetrace.station.StationCreateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actors")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;
    private final ActorRepository actorRepository;

    // ─────────────────────────────────────────────
    // LIST ALL ACTORS
    // ─────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Actor>> getAllActors() {
        return ResponseEntity.ok(actorService.getAll());
    }

    // ─────────────────────────────────────────────
    // CREATE GENERIC ACTOR
    // ─────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<Actor> createActor(@RequestBody Actor actor) {
        return ResponseEntity.ok(actorService.create(actor));
    }

    // ─────────────────────────────────────────────
    // REGISTER WASHING STATION
    // ─────────────────────────────────────────────
    @PostMapping("/stations")
    public ResponseEntity<Actor> registerStation(
            @RequestBody StationCreateRequest req
    ) {
        if (req.getName() == null || req.getName().isBlank()) {
            throw new IllegalArgumentException("Station name is required");
        }

        Actor station = Actor.builder()
                .name(req.getName())
                .type(ActorType.WASHING_STATION)
                .region(req.getRegion())
                .zone(req.getZone())
                .woreda(req.getWoreda())
                .kebele(req.getKebele())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .build();

        return ResponseEntity.ok(actorRepository.save(station));
    }

    // ─────────────────────────────────────────────
    // LIST ALL WASHING STATIONS
    // ─────────────────────────────────────────────
    @GetMapping("/stations")
    public ResponseEntity<List<Actor>> getAllStations() {
        return ResponseEntity.ok(
                actorRepository.findByType(ActorType.WASHING_STATION)
        );
    }
}

//package com.coffeetrace.users;
//
//import com.coffeetrace.station.StationCreateRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/actors")
//public class ActorController {
//
//    private final ActorService service;
//
//    private final ActorRepository actorRepo;
//
//    @Autowired
//    public ActorController(ActorService service) {
//        this.service = service;
//        actorRepo = null;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Actor>> list() {
//        return ResponseEntity.ok(service.getAll());
//    }
//
//    @PostMapping
//    public ResponseEntity<Actor> create(@RequestBody Actor actor) {
//        return ResponseEntity.ok(service.create(actor));
//    }
//
//    // REGISTER WASHING STATION
//    // ─────────────────────────────────────────────
//    @PostMapping("/stations")
//    public ResponseEntity<Actor> createStation(
//            @RequestBody StationCreateRequest req
//    ) {
//        if (req.getName() == null || req.getName().isBlank()) {
//            throw new IllegalArgumentException("Station name is required");
//        }
//
//        Actor station = Actor.builder()
//                .name(req.getName())
//                .type(ActorType.WASHING_STATION)
//                .region(req.getRegion())
//                .zone(req.getZone())
//                .woreda(req.getWoreda())
//                .kebele(req.getKebele())
//                .latitude(req.getLatitude())
//                .longitude(req.getLongitude())
//                .build();
//
//        return ResponseEntity.ok(actorRepo.save(station));
//    }
//
//    // ─────────────────────────────────────────────
//    // LIST ALL STATIONS (VERY IMPORTANT)
//    // ─────────────────────────────────────────────
//    @GetMapping("/stations")
//    public List<Actor> getStations() {
//        return actorRepo.findByType(ActorType.WASHING_STATION);
//    }
//
//}

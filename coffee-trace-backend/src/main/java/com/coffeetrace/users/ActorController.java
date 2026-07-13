package com.coffeetrace.users;

import com.coffeetrace.users.dto.ActorCreateRequest;
import com.coffeetrace.users.dto.ActorResponse;
import com.coffeetrace.users.dto.ActorUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/actors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ActorController {

    private final ActorService service;

    @GetMapping
    public List<ActorResponse> getAll(
            @RequestParam(required = false) ActorType type) {

        if (type != null) {
            return service.getByType(type);
        }

        return service.getAll();
    }

    @GetMapping("/{id}")
    public ActorResponse getById(@PathVariable UUID id) {
        return service.get(id);
    }

    @GetMapping("/type/{type}")
    public List<ActorResponse> getByType(
            @PathVariable ActorType type) {
        return service.getByType(type);
    }

    @PostMapping
    public ActorResponse create(
            @RequestBody ActorCreateRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public ActorResponse update(
            @PathVariable UUID id,
            @RequestBody ActorUpdateRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}


//package com.coffeetrace.users;
//
//import com.coffeetrace.station.StationCreateRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/actors")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class ActorController {
//
//    private final ActorService actorService;
//    private final ActorRepository actorRepository;
//
//    // LIST ALL ACTORS
//    @GetMapping
//    public ResponseEntity<List<Actor>> getAllActors() {
//        return ResponseEntity.ok(actorService.getAll());
//    }
//
//    // GET ONE ACTOR
//    @GetMapping("/{id}")
//    public ResponseEntity<Actor> getActor(@PathVariable UUID id) {
//        return ResponseEntity.ok(
//                actorRepository.findById(id)
//                        .orElseThrow(() -> new IllegalArgumentException("Actor not found"))
//        );
//    }
//
//    @PostMapping
//    public ResponseEntity<Actor> createActor(
//            @RequestBody Actor actor
//    ) {
//
//        if (actor.getType() == null) {
//            actor.setType(ActorType.FARMER);
//        }
//
//        return ResponseEntity.ok(actorService.create(actor));
//    }
//
////    // CREATE GENERIC ACTOR
////    @PostMapping
////    public ResponseEntity<Actor> createActor(@RequestBody Actor actor) {
////        return ResponseEntity.ok(actorService.create(actor));
////    }
//
//
//    // UPDATE GENERIC ACTOR
//    @PutMapping("/{id}")
//    public ResponseEntity<Actor> updateActor(
//            @PathVariable UUID id,
//            @RequestBody Actor req
//    ) {
//        Actor existing = actorRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Actor not found"));
//
//        existing.setName(req.getName());
//        existing.setType(req.getType());
//        existing.setRegion(req.getRegion());
//        existing.setZone(req.getZone());
//        existing.setWoreda(req.getWoreda());
//        existing.setKebele(req.getKebele());
//        existing.setLatitude(req.getLatitude());
//        existing.setLongitude(req.getLongitude());
//        existing.setPhotoUrl(req.getPhotoUrl());
//
//        return ResponseEntity.ok(actorRepository.save(existing));
//    }
//
//    // DELETE GENERIC ACTOR
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteActor(@PathVariable UUID id) {
//        Actor existing = actorRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Actor not found"));
//
//        actorRepository.delete(existing);
//        return ResponseEntity.noContent().build();
//    }
//
//    // LIST WASHING STATIONS
//    @GetMapping("/stations")
//    public ResponseEntity<List<Actor>> getAllStations() {
//        return ResponseEntity.ok(
//                actorRepository.findByTypeAndActiveTrue(ActorType.WASHING_STATION)
//        );
//    }
//
//    // REGISTER WASHING STATION
//    @PostMapping("/stations")
//    public ResponseEntity<Actor> registerStation(
//            @RequestBody StationCreateRequest req
//    ) {
//        if (req.getName() == null || req.getName().isBlank()) {
//            throw new IllegalArgumentException("Station name is required");
//        }
//
//        if (actorRepository.existsByNameAndTypeAndActiveTrue(
//                req.getName(),
//                ActorType.WASHING_STATION
//        )) {
//            throw new IllegalArgumentException("Station already exists: " + req.getName());
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
//        return ResponseEntity.ok(actorRepository.save(station));
//    }
//
//    // UPDATE WASHING STATION
//    @PutMapping("/stations/{id}")
//    public ResponseEntity<Actor> updateStation(
//            @PathVariable UUID id,
//            @RequestBody StationCreateRequest req
//    ) {
//        Actor station = actorRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Station not found"));
//
//        station.setType(ActorType.WASHING_STATION);
//        station.setName(req.getName());
//        station.setRegion(req.getRegion());
//        station.setZone(req.getZone());
//        station.setWoreda(req.getWoreda());
//        station.setKebele(req.getKebele());
//        station.setLatitude(req.getLatitude());
//        station.setLongitude(req.getLongitude());
//
//        return ResponseEntity.ok(actorRepository.save(station));
//    }
//
//
//    @DeleteMapping("/stations/{id}")
//    public ResponseEntity<Void> deleteStation(@PathVariable UUID id) {
//        Actor station = actorRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Station not found"));
//
//        station.setActive(false);
//        actorRepository.save(station);
//
//        return ResponseEntity.noContent().build();
//    }
//
//}
//

package com.coffeetrace.station;

import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StationService {

    private final StationRepository stationRepository;
    private final ActorRepository actorRepository;

    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    public Station getStation(UUID id) {
        return stationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Station not found: " + id));
    }
    public Actor createStation(Actor station) {

        if (actorRepository.existsByNameAndTypeAndActiveTrue(
                station.getName(),
                ActorType.WASHING_STATION)) {

            throw new IllegalArgumentException(
                    "Station already exists: " + station.getName());
        }

        station.setType(ActorType.WASHING_STATION);

        return actorRepository.save(station);
    }

//    public Station createStation(Station station) {
//
//
//        return stationRepository.save(station);
//    }

    public Station updateStation(Station station) {

        Station existing = stationRepository.findById(station.getId())
                .orElseThrow(() ->
                        new RuntimeException("Station not found: " + station.getId()));

        existing.setName(station.getName());
        existing.setRegion(station.getRegion());
        existing.setZone(station.getZone());
        existing.setWoreda(station.getWoreda());
        existing.setKebele(station.getKebele());
        existing.setLatitude(station.getLatitude());
        existing.setLongitude(station.getLongitude());
        existing.setPhotoUrl(station.getPhotoUrl());

        return stationRepository.save(existing);
    }

    public void deleteStation(UUID id) {

        Station station = stationRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Station not found: " + id));

        stationRepository.delete(station);
    }
}



//package com.coffeetrace.station;
//
//import com.coffeetrace.users.Actor;
//import com.coffeetrace.users.ActorRepository;
//import com.coffeetrace.users.ActorType;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class StationService {
//
//    private final StationRepository stationRepository;
//
////    public List<Station> getAllStations() {
////        return stationRepository.findAll();
////    }
//
//    private final ActorRepository actorRepository;
//
//    public List<Actor> getAllStations() {
//        return actorRepository.findByType(ActorType.WASHING_STATION);
//    }
//
//    public Station getStation(UUID id) {
//        return stationRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Station not found"));
//    }
//
//    public Station createStation(Station station) {
//        return stationRepository.save(station);
//    }
//
//    public Station updateStation(Station station) {
//    }
//
//    public void deleteStation(UUID id) {
//    }
//}

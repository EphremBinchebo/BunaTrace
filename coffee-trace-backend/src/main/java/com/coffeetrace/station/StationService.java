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

//    public List<Station> getAllStations() {
//        return stationRepository.findAll();
//    }

    private final ActorRepository actorRepository;

    public List<Actor> getAllStations() {
        return actorRepository.findByType(ActorType.WASHING_STATION);
    }

    public Station getStation(UUID id) {
        return stationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Station not found"));
    }

    public Station createStation(Station station) {
        return stationRepository.save(station);
    }
}

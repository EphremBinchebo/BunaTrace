package com.coffeetrace.actor;


import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FarmerService {

    private final ActorRepository actorRepository;

    public FarmerService(ActorRepository actorRepository) {
        this.actorRepository = actorRepository;
    }

    public List<Actor> getAllFarmers() {
        return actorRepository.findByTypeAndActiveTrue(ActorType.FARMER);
    }

    public List<Actor> getAllWashingStations() {
        return actorRepository.findByTypeAndActiveTrue(ActorType.WASHING_STATION);
    }
}



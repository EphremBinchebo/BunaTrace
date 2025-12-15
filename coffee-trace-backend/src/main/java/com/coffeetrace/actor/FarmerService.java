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
        return actorRepository.findByType(ActorType.FARMER);
    }
}


//@Service
//public class FarmerService {
//
//    private final FarmerRepository farmerRepository;
//
//    public FarmerService(FarmerRepository farmerRepository) {
//        this.farmerRepository = farmerRepository;
//    }
//
//    public List<Actor> getAllFarmers() {
//        return farmerRepository.findByType("FARMER");
//    }
//
//    public Actor getFarmerById(String farmerId) {
//        return farmerRepository.findById(farmerId)
//                .orElseThrow(() -> new RuntimeException("Farmer not found with ID: " + farmerId));
//    }
//}

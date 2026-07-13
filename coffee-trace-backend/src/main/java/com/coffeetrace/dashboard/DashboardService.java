package com.coffeetrace.dashboard;


import com.coffeetrace.batch.Batch;
import com.coffeetrace.batch.BatchRepository;
import com.coffeetrace.deliveries.FarmerDelivery;
import com.coffeetrace.deliveries.FarmerDeliveryRepository;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.users.ActorRepository;
import com.coffeetrace.users.ActorType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ActorRepository actorRepository;
    private final FarmRepository farmRepository;
    private final FarmerDeliveryRepository deliveryRepository;
    private final BatchRepository batchRepository;

    public DashboardStatsResponse getStats() {

        long farmers =
                actorRepository.countByType(ActorType.FARMER);

        long stations =
                actorRepository.countByType(ActorType.WASHING_STATION);

        long farms =
                farmRepository.count();

        long deliveries =
                deliveryRepository.count();

        long batches =
                batchRepository.count();

        double totalCherryKg =
                deliveryRepository.findAll()
                        .stream()
                        .mapToDouble(FarmerDelivery::getCherryKg)
                        .sum();

        double totalParchmentKg =
                batchRepository.findAll()
                        .stream()
                        .mapToDouble(Batch::getParchmentKg)
                        .sum();


        return DashboardStatsResponse.builder()
                .farmers(farmers)
                .stations(stations)
                .farms(farms)
                .deliveries(deliveries)
                .batches(batches)
                .totalCherryKg(totalCherryKg)
                .build();
    }

}
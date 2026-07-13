package com.coffeetrace.farms;

import com.coffeetrace.dashboard.ActivityService;
import com.coffeetrace.farms.FarmRepository;
import com.coffeetrace.farms.dto.FarmCreateRequest;
import com.coffeetrace.farms.dto.FarmResponse;
import com.coffeetrace.farms.dto.FarmUpdateRequest;
import com.coffeetrace.users.Actor;
import com.coffeetrace.users.ActorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FarmService {

    private final FarmRepository repository;
    private final ActorRepository actorRepository;
    private final ActivityService activityService;

    public List<FarmResponse> getAll() {

        return repository.findByActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public FarmResponse get(UUID id) {

        Farm farm = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Farm not found"));

        return toResponse(farm);
    }
    public List<FarmResponse> getByFarmer(UUID farmerId) {

        return repository.findByFarmerIdAndActiveTrue(farmerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public FarmResponse create(FarmCreateRequest request) {

        Actor farmer = actorRepository.findById(request.getFarmerId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Farmer not found"));

        Farm farm = Farm.builder()

                .farmer(farmer)

                .name(request.getName())

                .country("Ethiopia")

                .region(request.getRegion())
                .zone(request.getZone())
                .woreda(request.getWoreda())
                .kebele(request.getKebele())

                .latitude(request.getLatitude())
                .longitude(request.getLongitude())

                .areaHectares(request.getAreaHectares())
                .elevation(request.getElevation())
                .variety(request.getVariety())

                .plantingYear(request.getPlantingYear())

                .organic(request.getOrganic())

                .certification(request.getCertification())

                .polygon(request.getPolygon())

                .photoUrl(request.getPhotoUrl())

                .notes(request.getNotes())

                .active(true)

                .build();

        farm = repository.save(farm);

        activityService.log(
                "New Farm",
                farm.getName(),
                "FARM",
                "CREATED"
        );

        return toResponse(farm);
    }

    public FarmResponse update(UUID id,
                               FarmUpdateRequest request) {

        Farm farm = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Farm not found"));

        farm.setName(request.getName());

        farm.setRegion(request.getRegion());
        farm.setZone(request.getZone());
        farm.setWoreda(request.getWoreda());
        farm.setKebele(request.getKebele());

        farm.setLatitude(request.getLatitude());
        farm.setLongitude(request.getLongitude());

        farm.setAreaHectares(request.getAreaHectares());

        farm.setElevation(request.getElevation());

        farm.setVariety(request.getVariety());

        farm.setPlantingYear(request.getPlantingYear());

        farm.setOrganic(request.getOrganic());

        farm.setCertification(request.getCertification());

        farm.setPolygon(request.getPolygon());

        farm.setPhotoUrl(request.getPhotoUrl());

        farm.setNotes(request.getNotes());

        if (request.getActive() != null) {
            farm.setActive(request.getActive());
        }

        farm = repository.save(farm);

        activityService.log(
                "Updated Farm",
                farm.getName(),
                "FARM",
                "UPDATED"
        );

        return toResponse(farm);
    }
    public void delete(UUID id) {

        Farm farm = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Farm not found"));

        farm.setActive(false);

        repository.save(farm);

        activityService.log(
                "Deleted Farm",
                farm.getName(),
                "FARM",
                "DELETED"
        );
    }
    private FarmResponse toResponse(Farm farm) {

        return FarmResponse.builder()

                .id(farm.getId())

                .farmerId(farm.getFarmer().getId())

                .farmerName(farm.getFarmer().getName())

                .name(farm.getName())

                .country(farm.getCountry())

                .region(farm.getRegion())
                .zone(farm.getZone())
                .woreda(farm.getWoreda())
                .kebele(farm.getKebele())

                .latitude(farm.getLatitude())
                .longitude(farm.getLongitude())

                .areaHectares(farm.getAreaHectares())

                .elevation(farm.getElevation())

                .variety(farm.getVariety())

                .plantingYear(farm.getPlantingYear())

                .organic(farm.getOrganic())

                .certification(farm.getCertification())

                .polygon(farm.getPolygon())

                .photoUrl(farm.getPhotoUrl())

                .notes(farm.getNotes())

                .active(farm.getActive())

                .build();
    }
}

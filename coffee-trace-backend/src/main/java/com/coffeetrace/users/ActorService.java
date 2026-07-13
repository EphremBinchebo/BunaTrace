package com.coffeetrace.users;

import com.coffeetrace.dashboard.ActivityService;
import com.coffeetrace.users.dto.ActorCreateRequest;
import com.coffeetrace.users.dto.ActorResponse;
import com.coffeetrace.users.dto.ActorUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository repository;
    private final ActivityService activityService;

    public List<ActorResponse> getAll() {

        return repository.findByActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();

    }

    public List<ActorResponse> getByType(ActorType type){

        return repository.findByTypeAndActiveTrue(type)
                .stream()
                .map(this::toResponse)
                .toList();

    }

    public ActorResponse get(UUID id){

        Actor actor = repository.findByIdAndActiveTrue(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Actor not found"));

        return toResponse(actor);

    }

    public ActorResponse create(
            ActorCreateRequest request
    ){

        if(repository.existsByNameAndTypeAndActiveTrue(
                request.getName(),
                request.getType())){

            throw new IllegalArgumentException(
                    request.getType()+" already exists.");

        }

        Actor actor = Actor.builder()

                .name(request.getName())

                .type(request.getType())

                .phone(request.getPhone())

                .region(request.getRegion())

                .zone(request.getZone())

                .woreda(request.getWoreda())

                .kebele(request.getKebele())

                .latitude(request.getLatitude())

                .longitude(request.getLongitude())

                .photoUrl(request.getPhotoUrl())

                .build();

        actor = repository.save(actor);

        activityService.log(

                "New "+actor.getType(),

                actor.getName(),

                actor.getType().name(),

                "CREATED"

        );

        return toResponse(actor);

    }

    public ActorResponse update(

            UUID id,

            ActorUpdateRequest request

    ){

        Actor actor = repository.findByIdAndActiveTrue(id)

                .orElseThrow(() ->
                        new IllegalArgumentException("Actor not found"));

        actor.setName(request.getName());

        actor.setPhone(request.getPhone());

        actor.setRegion(request.getRegion());

        actor.setZone(request.getZone());

        actor.setWoreda(request.getWoreda());

        actor.setKebele(request.getKebele());

        actor.setLatitude(request.getLatitude());

        actor.setLongitude(request.getLongitude());

        actor.setPhotoUrl(request.getPhotoUrl());

        if(request.getActive()!=null){

            actor.setActive(request.getActive());

        }

        actor = repository.save(actor);

        activityService.log(

                "Updated "+actor.getType(),

                actor.getName(),

                actor.getType().name(),

                "UPDATED"

        );

        return toResponse(actor);

    }

    public void delete(UUID id){

        Actor actor = repository.findByIdAndActiveTrue(id)

                .orElseThrow(() ->
                        new IllegalArgumentException("Actor not found"));

        actor.setActive(false);

        repository.save(actor);

        activityService.log(

                "Deleted "+actor.getType(),

                actor.getName(),

                actor.getType().name(),

                "DELETED"

        );

    }

    private ActorResponse toResponse(Actor actor){

        return ActorResponse.builder()

                .id(actor.getId())

                .name(actor.getName())

                .type(actor.getType())

                .phone(actor.getPhone())

                .country(actor.getCountry())

                .region(actor.getRegion())

                .zone(actor.getZone())

                .woreda(actor.getWoreda())

                .kebele(actor.getKebele())

                .latitude(actor.getLatitude())

                .longitude(actor.getLongitude())

                .photoUrl(actor.getPhotoUrl())

                .active(actor.getActive())

                .build();

    }

}
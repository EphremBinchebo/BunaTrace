package com.coffeetrace.users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActorService {

    private final ActorRepository repo;

    public ActorService(ActorRepository repo) {
        this.repo = repo;
    }

    public List<Actor> getAll() { return repo.findAll(); }

    public Actor create(Actor actor) { return repo.save(actor); }
}

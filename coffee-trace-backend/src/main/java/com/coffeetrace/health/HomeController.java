package com.coffeetrace.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "BunaTrace API Running";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
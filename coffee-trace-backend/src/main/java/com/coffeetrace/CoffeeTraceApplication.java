package com.coffeetrace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication   // this scans com.coffeetrace.* by default
public class CoffeeTraceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CoffeeTraceApplication.class, args);
    }
}
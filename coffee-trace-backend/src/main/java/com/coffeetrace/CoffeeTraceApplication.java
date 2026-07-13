package com.coffeetrace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication   // this scans com.coffeetrace.* by default
public class CoffeeTraceApplication {
    public static void main(String[] args) {
        SpringApplication.run(CoffeeTraceApplication.class, args);
    }
}
//
//package com.coffeetrace;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//@SpringBootApplication
//public class CoffeeTraceApplication {
//
//    @Value("${spring.datasource.url}")
//    private String url;
//
//    @Value("${spring.datasource.username}")
//    private String username;
//
//    public static void main(String[] args) {
//        SpringApplication.run(CoffeeTraceApplication.class, args);
//    }
//
//    @Bean
//    CommandLineRunner test() {
//        return args -> {
//            System.out.println("=================================");
//            System.out.println("Datasource URL: " + url);
//            System.out.println("Datasource User: " + username);
//            System.out.println("=================================");
//        };
//    }
//}
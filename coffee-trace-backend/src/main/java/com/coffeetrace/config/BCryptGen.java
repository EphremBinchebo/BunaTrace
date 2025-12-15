package com.coffeetrace.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGen {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String raw = "abigail";
        String hash = encoder.encode(raw);

        System.out.println("Password: " + raw);
        System.out.println("BCrypt Hash: " + hash);
    }
}
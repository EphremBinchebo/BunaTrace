package com.coffeetrace.auth.dto;

import com.coffeetrace.auth.AppUser;
import com.coffeetrace.auth.Role;
import lombok.*;

//@Getter
//public class AuthResponse {
//    public AuthResponse(String s) {
//    }
////    private String token;
////    public AuthResponse register(RegisterRequest req) {
////
////        AppUser user = AppUser.builder()
////                .username(req.getEmail())     // REQUIRED — FIXES THE ERROR
////                .email(req.getEmail())
////                .password(passwordEncoder.encode(req.getPassword()))
////                .role(Role.USER)
////                .build();
////
////        userRepository.save(user);
////
////        String token = jwtService.generateToken(user);
////
////        return new AuthResponse(token);
////    }
////
////    public AuthResponse(String token) {
////        this.token = token;
////    }
//}
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
}

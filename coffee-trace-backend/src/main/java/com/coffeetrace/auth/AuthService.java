package com.coffeetrace.auth;

import com.coffeetrace.auth.dto.AuthRequest;
import com.coffeetrace.auth.dto.AuthResponse;
import com.coffeetrace.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//@Service
//public class AuthService {
//
//    private final UserRepository userRepo;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//    private final AuthenticationManager authManager;
//
//    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authManager) {
//        this.userRepo = userRepo;
//        this.passwordEncoder = passwordEncoder;
//        this.jwtService = jwtService;
//        this.authManager = authManager;
//    }
//
//    public AuthResponse register(RegisterRequest req) {
//        AppUser user = AppUser.builder()
//                .username(req.getUsername())
//                .password(passwordEncoder.encode(req.getPassword()))
//                .role(req.getRole())
//                .build();
//        userRepo.save(user);
//        String token = jwtService.generateToken(user);
//        return new AuthResponse(token);
//    }
//
//    public AuthResponse login(AuthRequest req) {
//        authManager.authenticate(
//                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword())
//        );
//        AppUser user = userRepo.findByUsername(req.getUsername())
//                .orElseThrow();
//        String token = jwtService.generateToken(user);
//        return new AuthResponse(token);
//    }
//}
//@Service
//@RequiredArgsConstructor
//public class AuthService {
//
//    private final UserRepository userRepo;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//    private final AuthenticationManager authenticationManager;
//
//    public AuthResponse register(RegisterRequest req) {
//        AppUser user = AppUser.builder()
//                .username(req.getUsername())
//                .password(passwordEncoder.encode(req.getPassword()))
//                .role(req.getRole())
//                .username(req.getEmail())
//                .build();
//
//        userRepo.save(user);
//
//        return new AuthResponse(jwtService.generateToken(user));
//    }
//
//    public AuthResponse login(AuthRequest req) {
//
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        req.getUsername(),
//                        req.getPassword()
//                )
//        );
//
//        AppUser user = userRepo.findByUsername(req.getUsername())
//                .orElseThrow();
//
//        return new AuthResponse(jwtService.generateToken(user));
//    }
//}

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
//    public AuthResponse register(RegisterRequest req) {
//        AppUser user = AppUser.builder()
//                .username(req.getUsername())              // keep this
//                .password(passwordEncoder.encode(req.getPassword()))
//                .role(req.getRole())
//                .build();
//
//        userRepo.save(user);
//
//        return new AuthResponse(jwtService.generateToken(user));
//    }
public AuthResponse register(RegisterRequest req) {

    Role role = req.getRole() != null ? req.getRole() : Role.USER;

    AppUser user = AppUser.builder()
            .username(req.getUsername())
            .password(passwordEncoder.encode(req.getPassword()))
            .role(role)
            .build();

    userRepo.save(user);

    return AuthResponse.builder()
            .token(jwtService.generateToken(user))
            .build();
}


//    public AuthResponse register(RegisterRequest req) {
//
//        // Decide what your username should be
//        String username = req.getUsername() != null ? req.getUsername() : req.getEmail();
//
//        if (username == null || username.isBlank()) {
//            throw new IllegalArgumentException("Username or email must be provided");
//        }
//
//        AppUser user = AppUser.builder()
//                .username(username)
//                .password(passwordEncoder.encode(req.getPassword()))
//                .role(req.getRole())
//                .build();
//
//        userRepo.save(user);
//
//        return new AuthResponse(jwtService.generateToken(user));
//    }

    public AuthResponse login(AuthRequest req) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(),
                        req.getPassword()
                )
        );

        AppUser user = userRepo.findByUsername(req.getUsername())
                .orElseThrow();

        return new AuthResponse(jwtService.generateToken(user));
    }
}

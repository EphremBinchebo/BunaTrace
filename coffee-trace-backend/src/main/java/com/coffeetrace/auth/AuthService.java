package com.coffeetrace.auth;

import com.coffeetrace.auth.dto.AuthRequest;
import com.coffeetrace.auth.dto.AuthResponse;
import com.coffeetrace.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

public AuthResponse register(RegisterRequest req) {

    Role role = req.getRole() != null ? req.getRole() : Role.USER;

    AppUser user = AppUser.builder()
            .id(UUID.randomUUID().toString())
            .username(req.getUsername())
            .password(passwordEncoder.encode(req.getPassword()))
            .role(role)
            .build();

//    AppUser user = AppUser.builder()
//            .username(req.getUsername())
//            .password(passwordEncoder.encode(req.getPassword()))
//            .role(role)
//            .build();

    userRepo.save(user);

    return AuthResponse.builder()
            .token(jwtService.generateToken(user))
            .build();
}

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

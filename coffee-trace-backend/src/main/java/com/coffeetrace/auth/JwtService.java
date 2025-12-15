//package com.coffeetrace.auth;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class JwtService {
//
//    private final Key key;
//
//    public JwtService(@Value("${jwt.secret}") String secret) {
//        this.key = Keys.hmacShaKeyFor(secret.getBytes());
//    }
//
//    // MAIN TOKEN GENERATOR
//    public String generateToken(AppUser user) {
//
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("userId", user.getId());
//        claims.put("username", user.getUsername());
//        claims.put("role", user.getRole().name());
//
//        return Jwts.builder()
//                .setSubject(user.getUsername())
//                .addClaims(claims)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
//                .signWith(key, SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    // EXTRACT USERNAME FROM TOKEN
//    public String extractUsername(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//    // CHECK TOKEN VALIDITY
//    public boolean isTokenValid(String token, String username) {
//        return extractUsername(token).equals(username) && !isExpired(token);
//    }
//
//    private boolean isExpired(String token) {
//        Date expiration = Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getExpiration();
//        return expiration.before(new Date());
//    }
//}
package com.coffeetrace.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    private final Key key;

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // MAIN TOKEN GENERATOR
    public String generateToken(AppUser user) {
        Map<String, Object> claims = Map.of(
                "userId", user.getId(),
                "role", user.getRole().name()
        );

        return buildToken(
                user.getUsername(),
                claims,
                1000 * 60 * 60 * 24 // 24 hours
        );
    }

    // INTERNAL BUILDER
    private String buildToken(String username, Map<String, Object> claims, long expirationMs) {
        return Jwts.builder()
                .setSubject(username)
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        String extracted = extractUsername(token);
        return extracted.equals(username) && !isExpired(token);
    }

    private boolean isExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}

package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.InvalidRefreshTokenException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.TokenExpiredException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Service
public class JwtService {

    private final String SECRET = "A73172E09F3D7AEAF34A7303FD39956EE5F7F164F2516BCFAEA77124241DD20F3CBFFD3E07B4D97A0FD866DAABBFD6AA388CCDC8AB6B534F7796D660AE282563";

    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 3; // 60 minutes
    private static final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7; // 7 days

    private final MyTokenRepository tokenRepository;

    public JwtService(MyTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public String extractUserName(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    // added new
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String jwt, UserDetails user) {
        String username = extractUserName(jwt);

        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        boolean validToken = tokenRepository
                .findByAccessToken(jwt)
                .map(t -> {
                    System.out.println("Token found: " + t);
                    return !t.isLoggedOut();
                })
                .orElse(false);
        System.out.println(validToken); //TODO: complete this code some errors in valid Func

        if (!username.equals(user.getUsername())) {
            throw new UsernameNotFoundException("Invalid token: username mismatch, token expired, or not valid");
        }

        if (isTokenExpired(jwt)) {
            throw new TokenExpiredException("Invalid token: username mismatch, token expired, or not valid");
        }
        return true;

//        if (username.equals(user.getUsername()) && !isTokenExpired(jwt)) {
//            return true;
//        }
//        throw new TokenExpiredException("Invalid token: username mismatch, token expired, or not valid");
    }

    public boolean isValidRefreshToken(String token, MyUser user) {
        String username = extractUserName(token);

        boolean validRefreshToken = tokenRepository
                .findByRefreshToken(token)
                .map(t -> !t.isLoggedOut())
                .orElse(false);

        // If username doesn't match or the token is expired or invalid, throw an exception
        if (!username.equals(user.getUsername())) {
            throw new InvalidRefreshTokenException("Username does not match the refresh token");
        }

        if (isTokenExpired(token)) {
            throw new TokenExpiredException("Refresh token has expired");
        }

        if (!validRefreshToken) {
            throw new InvalidRefreshTokenException("Refresh token is logged out or invalid");
        }

        return true; // All checks passed
    }

    // added new
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // added new
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public Claims extractAllClaims(String jwt) {
        return Jwts
                .parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(jwt)
                .getPayload();
    }

    // generic
    public String generateAccessToken(UserDetails user) {
        return generateToken(user, ACCESS_TOKEN_VALIDITY);
    }

    // generic
    public String generateRefreshToken(UserDetails user) {
        return generateToken(user, REFRESH_TOKEN_VALIDITY);
    }

    // generic
    public String generateToken(UserDetails userDetails, long expiryTime) {
        Map<String, String> claims = new HashMap<>();
        claims.put("iss", "devtaha.org.is");

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusMillis(expiryTime)))
                .signWith(generateKey())
                .compact();
    }

    // generic
    private SecretKey generateKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET);
        return Keys.hmacShaKeyFor(decodedKey);
    }
}

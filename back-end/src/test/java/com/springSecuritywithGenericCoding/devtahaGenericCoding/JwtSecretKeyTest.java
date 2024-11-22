package com.springSecuritywithGenericCoding.devtahaGenericCoding;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.List;

@SpringBootTest
public class JwtSecretKeyTest {

    @Autowired
    public JwtService jwtService;

    @Test
    void getClaims() {
        Claims claims = jwtService.extractAllClaims("eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZ0YWhhLm9yZy5pcyIsInN1YiI6InVzZXIiLCJpYXQiOjE3Mjg2Mzk0ODEsImV4cCI6MTcyODY0MTI4MX0.hGbs0gpPHeH3gcsOaLeNYQoa_9rJZQXpOqxPOEoC1yIgoWh24lqf-bgMPFB-IvDeuyCbtF6U9Diim7oIyc3raA");
        System.out.println(claims);
    }

    @Test
    void extractUsername() {
        String username = jwtService.extractUserName("eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXZ0YWhhLm9yZy5pcyIsInN1YiI6InVzZXIiLCJpYXQiOjE3Mjg2Mzk0ODEsImV4cCI6MTcyODY0MTI4MX0.hGbs0gpPHeH3gcsOaLeNYQoa_9rJZQXpOqxPOEoC1yIgoWh24lqf-bgMPFB-IvDeuyCbtF6U9Diim7oIyc3raA");
        System.out.println(username);
    }
}

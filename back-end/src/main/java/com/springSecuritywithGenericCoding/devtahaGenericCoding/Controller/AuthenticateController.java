package com.springSecuritywithGenericCoding.devtahaGenericCoding.Controller;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponseResource;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Dto.LoginForm;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.MyTokenServiceImplementation;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.MyUserDetailsService;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticateController {


    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MyUserDetailsService userDetailsService;
    private final MyTokenServiceImplementation tokenService;

    public AuthenticateController(AuthenticationManager authenticationManager, JwtService jwtService, MyUserDetailsService userDetailsService, MyTokenServiceImplementation tokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.tokenService = tokenService;
    }

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginForm.getUsername(),
                        loginForm.getPassword()
                ));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(userDetailsService.loadUserByUsername(loginForm.getUsername()),30);
        } else {
            throw new UsernameNotFoundException("invalid credentials !");
        }
    }

    @PostMapping("/auth/login")
    public AuthenticationResponseResource authenticateUser(@RequestBody LoginForm user) {
        return userDetailsService.authenticate(user);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request,
                                                               HttpServletResponse response) throws IOException {
        return tokenService.refreshToken(request, response);
    }

}

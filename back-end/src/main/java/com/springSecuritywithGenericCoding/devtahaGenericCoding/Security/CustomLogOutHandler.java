package com.springSecuritywithGenericCoding.devtahaGenericCoding.Security;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyToken;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import java.util.Optional;

@Configuration
public class CustomLogOutHandler implements LogoutHandler {


    private final MyTokenRepository tokenRepository;

    public CustomLogOutHandler(MyTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void logout(@NonNull HttpServletRequest request,
                       @NonNull HttpServletResponse response,
                       @NonNull Authentication authentication) {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }

        String jwt = authHeader.substring(7);
        Optional<MyToken> storedToken = tokenRepository.findByAccessToken(jwt);

        if (storedToken.isPresent()){
            MyToken token = storedToken.get();
            token.setLoggedOut(true);
            tokenRepository.save(token);
        } else {
            throw new BadCredentialsException("Invalid access token");
        }
    }
}

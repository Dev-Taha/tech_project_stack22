package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.InvalidRefreshTokenException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyToken;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyTokenRepository;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyUserRepository;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MyTokenServiceImplementation implements MyTokenService {

    private final MyTokenRepository tokenRepository;
    private final JwtService jwtService;
    private final MyUserRepository userRepository;

    public MyTokenServiceImplementation(MyTokenRepository tokenRepository, JwtService jwtService, MyUserRepository userRepository) {
        this.tokenRepository = tokenRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public void saveUserToken(String accessToken, String refreshToken, MyUser user) {
        MyToken userToken = MyToken.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .loggedOut(false)
                .user(user)
                .build();
        tokenRepository.save(userToken);
    }

    @Override
    public void revokeAllTokenByUser(MyUser user) {
        List<MyToken> validTokens = tokenRepository
                .findAllAccessTokenByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(token -> {
            token.setLoggedOut(true);
        });

        tokenRepository.saveAll(validTokens);
    }


    @Override
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request,
                                                               HttpServletResponse response) throws IOException {
        // extreact token from auth header
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        String jwt = authHeader.substring(7);

        String username = jwtService.extractUserName(jwt);
        // get username from database
        Optional<MyUser> user = userRepository.findMyUserByUsername(username);

        if(user.isPresent()) {
            MyUser userObj = user.get();
            //check token is valid
            try {
                if (jwtService.isValidRefreshToken(jwt,userObj)) {
                    // generate access token
                    String accessToken = jwtService.generateAccessToken(userObj);
                    String refreshToken = jwtService.generateRefreshToken(userObj);

                    revokeAllTokenByUser(userObj);
                    saveUserToken(accessToken,refreshToken, userObj);

                    return new ResponseEntity<>(
                            new AuthenticationResponse(accessToken, refreshToken, "new token generated"),
                            HttpStatus.OK);
                }
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(e.getMessage());
                throw new InvalidRefreshTokenException(e.getMessage());
            }
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}

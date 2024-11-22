package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface MyTokenService {
    public void saveUserToken(String accessToken, String refreshToken, MyUser user);
    public void revokeAllTokenByUser(MyUser user);
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
}

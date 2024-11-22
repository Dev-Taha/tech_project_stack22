package com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
@Builder
@Getter
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("message")
    private String massage;

    public AuthenticationResponse(String accessToken, String refreshToken, String massage) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.massage = massage;
    }
}

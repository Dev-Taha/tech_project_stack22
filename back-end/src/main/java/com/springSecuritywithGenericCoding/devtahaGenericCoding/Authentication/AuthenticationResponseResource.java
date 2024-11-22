package com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthenticationResponseResource {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("message")
    private String massage;

    private MyUser user;

    public AuthenticationResponseResource(String accessToken, String refreshToken, String massage, MyUser user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.massage = massage;
        this.user = user;
    }
}

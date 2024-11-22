package com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InvalidRefreshTokenException extends RuntimeException{

    private String msg_token_exception;

    public InvalidRefreshTokenException(String message) {
        super(message);
        this.msg_token_exception = message;
    }
}

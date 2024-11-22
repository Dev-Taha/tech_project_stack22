package com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TokenExpiredException extends RuntimeException {
    private String msg_token_exception;

    public TokenExpiredException(String message) {
        super(message);
        this.msg_token_exception = message;
    }
}

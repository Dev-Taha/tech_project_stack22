package com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserNotFoundException extends RuntimeException {
    private String msg_users_exception;

    public UserNotFoundException(String message) {
        super(message);
        this.msg_users_exception = message;
    }
}

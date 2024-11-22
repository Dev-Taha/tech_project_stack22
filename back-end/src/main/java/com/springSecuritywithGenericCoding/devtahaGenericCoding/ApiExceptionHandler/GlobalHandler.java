package com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleException(UserNotFoundException exp) {
        return ResponseEntity
                .badRequest()
                .body(exp.getMsg_users_exception());
    }

    @ExceptionHandler({TokenExpiredException.class, InvalidRefreshTokenException.class})
    public ResponseEntity<Map<String, String>> handleTokenExceptions(RuntimeException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED.toString());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}
package com.springSecuritywithGenericCoding.devtahaGenericCoding.Dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginForm {
    private String username;
    private String password;
}

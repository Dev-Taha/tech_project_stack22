package com.springSecuritywithGenericCoding.devtahaGenericCoding.Dto;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyUserDto {
    private Long id;
    private String username;
    private String password; // ADMIN ,USER
    private Role role;
    private String firstName;
    private String lastName;
    private String email;

    public static MyUserDto map(MyUser user) {
        return MyUserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
    }
}

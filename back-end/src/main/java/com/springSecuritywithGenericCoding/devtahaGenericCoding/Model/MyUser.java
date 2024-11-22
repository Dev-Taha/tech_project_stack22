package com.springSecuritywithGenericCoding.devtahaGenericCoding.Model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
@Builder
@Entity
public class MyUser implements UserDetails {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String password; // ADMIN ,USER
    @Enumerated(EnumType.STRING)
    private Role role;
    private String firstName;
    private String lastName;
    private String email;

    @OneToMany
    private List<MyToken> tokens;

    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

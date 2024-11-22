package com.springSecuritywithGenericCoding.devtahaGenericCoding.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
public class MyToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String accessToken;
    private String refreshToken;
    private boolean loggedOut;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private MyUser user;
}

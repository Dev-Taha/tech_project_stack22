package com.springSecuritywithGenericCoding.devtahaGenericCoding.Controller;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponseResource;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.MyUserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RegistrationController {

    private final MyUserDetailsService userDetailsService;

    public RegistrationController(MyUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register/user")
    public AuthenticationResponseResource createUser(@RequestBody MyUser user) {
        return userDetailsService.createUser(user);
    }
}

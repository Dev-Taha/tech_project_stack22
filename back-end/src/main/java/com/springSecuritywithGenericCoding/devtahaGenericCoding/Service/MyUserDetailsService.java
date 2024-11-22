package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponseResource;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Dto.LoginForm;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.Role;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyUserRepository;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService, AuthenticateService {

    private final MyUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MyTokenServiceImplementation tokenService;


    public MyUserDetailsService(MyUserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                JwtService jwtService,
                                AuthenticationManager authenticationManager,
                                MyTokenServiceImplementation tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> user = userRepository.findMyUserByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole().toString())
                    .build();
        } else {
            throw new UsernameNotFoundException(username + "not found !!");
        }
    }

    // TODO:: getRoles Fun if the user no has a roll give his USER role , else split ,
//    public String[] getRoles(MyUser user) {
//        if (user.getRole() == null) {
//            return new String[]{"USER"};
//        } else {
//            return user.getRole().split(",");
//        }
//    }


    @Override
    public AuthenticationResponseResource createUser(MyUser user) {

        if (userRepository.findMyUserByUsername(user.getUsername()).isPresent()) {
            return new AuthenticationResponseResource(null,
                    null,
                    "user already exists",null);
        }

        MyUser savedUser = MyUser.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        MyUser result = userRepository.save(savedUser);

        String accessToken = jwtService.generateAccessToken(result);
        String refreshToken = jwtService.generateRefreshToken(result);

        tokenService.saveUserToken(accessToken, refreshToken, result);

        return new AuthenticationResponseResource(accessToken, refreshToken, "user created successfully !!",result);
    }

    @Override
    public AuthenticationResponseResource authenticate(LoginForm user) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                ));
        if (auth.isAuthenticated()) {
            MyUser userObj = userRepository.findMyUserByUsername(user.getUsername()).orElseThrow();

            String accessToken = jwtService.generateAccessToken(userObj);
            String refreshToken = jwtService.generateRefreshToken(userObj);

            return AuthenticationResponseResource.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .massage("success authenticated user !!")
                    .user(userObj)
                    .build();
        } else {
            throw new UsernameNotFoundException(user.getUsername() + "not authenticated !!");
        }
    }
}

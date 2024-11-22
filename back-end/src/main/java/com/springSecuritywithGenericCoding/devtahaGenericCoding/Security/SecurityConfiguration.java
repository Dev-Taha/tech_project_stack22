package com.springSecuritywithGenericCoding.devtahaGenericCoding.Security;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.MyUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final MyUserDetailsService userDetailsService;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomLogOutHandler customLogOutHandler;

    public SecurityConfiguration(@Lazy MyUserDetailsService userDetailsService,
                                 @Lazy JwtAuthenticationFilter jwtAuthenticationFilter,
                                 CustomLogOutHandler customLogOutHandler) {
        this.userDetailsService = userDetailsService;

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.customLogOutHandler = customLogOutHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/", "/home", "/register/user","/register").permitAll();
                    registry.requestMatchers("/authenticate", "/auth/login","/refreshToken/**").permitAll();
                    registry.requestMatchers("/admin/delete/**", "/admin/update/**", "/admin/users", "/admin/user/*","/admin/home", "/admin/username/**","/admin/page/*").permitAll();
                    registry.requestMatchers("/user/update/**", "/user/userId/**", "/user/username/*").permitAll();

                    registry.requestMatchers("/admin/**").hasRole("ADMIN");
                    registry.requestMatchers("/user/**").hasRole("USER");
                    registry.requestMatchers("/css/**", "/js/**", "/image/**").permitAll();
                    registry.anyRequest().authenticated();
                })
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
//                .formLogin(httpSecurityFormLoginConfigurer -> {
//                    httpSecurityFormLoginConfigurer
//                            .loginPage("/login")
//                            .successHandler(new AuthenticationSuccessHandler()) // handler for users >> route user or admin
//                            .permitAll();
//                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> {
                            exception.accessDeniedHandler(
                                    (request, response, accessDeniedException) -> response.setStatus(HttpStatus.FORBIDDEN.value())
                            )
                            .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
                }).logout(logout -> {
                    logout.logoutUrl("/logout");
                    logout.addLogoutHandler(customLogOutHandler);
                    logout.logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
                })
                .build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

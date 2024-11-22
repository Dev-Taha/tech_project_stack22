package com.springSecuritywithGenericCoding.devtahaGenericCoding.Security;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.TokenExpiredException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.MyUserDetailsService;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.WebToken.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.apache.el.parser.TokenMgrError;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Configuration
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final MyUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, MyUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        // TODO: this if statement tells us that the authHeader if = null and not start with Bearer (bearer for token)
        // TODO: then there is no action will happen so no operation . (then doFilter func)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) { //!authHeader
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String username = jwtService.extractUserName(jwt);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            try{
                if (userDetails != null && jwtService.isTokenValid(jwt,userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username, //username
                            userDetails.getPassword(), //userDetails.getPassword()
                            userDetails.getAuthorities()
                    );
                    // TODO:: to track who is entire to the system
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (TokenExpiredException e) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(e.getMessage());
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}

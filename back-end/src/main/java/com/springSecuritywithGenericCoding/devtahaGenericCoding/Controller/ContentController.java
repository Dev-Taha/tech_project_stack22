package com.springSecuritywithGenericCoding.devtahaGenericCoding.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContentController {

    @GetMapping("/home")
    public String handleWelcome() {
        return "home";
    }

    @GetMapping("/")
    public String publicPage() {
        return "home";
    }

    @GetMapping("/login")
    public String handleLoginPage() {
        return "custom_login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
}

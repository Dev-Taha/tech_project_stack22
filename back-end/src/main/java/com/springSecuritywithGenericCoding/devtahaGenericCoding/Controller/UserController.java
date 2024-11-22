package com.springSecuritywithGenericCoding.devtahaGenericCoding.Controller;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.UserServiceImplementation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserServiceImplementation userServiceImplementation;

    public UserController(UserServiceImplementation userServiceImplementation) {
        this.userServiceImplementation = userServiceImplementation;
    }

    @GetMapping("/home")
    public ResponseEntity<String> msg() {
        return ResponseEntity.ok("user home page ..");
//        return "home_user"; //// do not forget this route will redirect in html page
    }

    @PutMapping("/update/{id}") //done
    public ResponseEntity<MyUser> updateUser(@RequestBody MyUser user, @PathVariable long id) {
        user = userServiceImplementation.updateUser(user, id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/userId/{id}") // done
    public ResponseEntity<MyUser> getUserById(@PathVariable long id) {
        MyUser user = userServiceImplementation.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}") //done
    public ResponseEntity<Long> getIdUserByUsername(@PathVariable String username) {
        Long userId = userServiceImplementation.getUserByName(username);
        return ResponseEntity.ok(userId);
    }
}

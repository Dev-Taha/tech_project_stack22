package com.springSecuritywithGenericCoding.devtahaGenericCoding.Controller;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.UserNotFoundException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.PaginatedResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Service.UserServiceImplementation;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserServiceImplementation userServiceImplementation;

    public AdminController(UserServiceImplementation userServiceImplementation) {
        this.userServiceImplementation = userServiceImplementation;
    }

    @GetMapping("/home") // admin/home
    public String handleAdminHome() {
        return "home_admin.html"; // do not forget this route will redirect in html page
    }

    @GetMapping("/users")// done
    public List<MyUser> getUsers() {
        return userServiceImplementation.getUsers();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id) {
        try {
            String response = userServiceImplementation.deleteUser(id);
            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }


    @PutMapping("/update/{id}") //done
    public ResponseEntity<MyUser> updateUser(@PathVariable Long id,@RequestBody MyUser user) {
        try {
            MyUser updatedUser = userServiceImplementation.updateUser(user, id);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/user/{id}") // done
    public ResponseEntity<MyUser> getUserById(@PathVariable long id) {
        MyUser user = userServiceImplementation.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}") //done
    public ResponseEntity<Long> getIdUserByUsername(@PathVariable String username) {
        Long userId = userServiceImplementation.getUserByName(username);
        return ResponseEntity.ok(userId);
    }

    @GetMapping("/page/{pageNo}")
    public PaginatedResponse<MyUser> findPaginated(@PathVariable int pageNo,
                                                   @RequestParam String sortField,
                                                   @RequestParam String sortDirection) {
        int pageSize = 7;
        Page<MyUser> page = userServiceImplementation.findPaginated(
                pageNo,
                pageSize,
                sortField,
                sortDirection
        );

        PaginatedResponse<MyUser> response = new PaginatedResponse<>();
        response.setContent(page.getContent());
        response.setTotalPages(page.getTotalPages());
        response.setPageNo(pageNo);
        response.setPageSize(pageSize);
        response.setTotalElements(page.getTotalElements());
        response.setLast(page.isLast());

        return response;

    }


}

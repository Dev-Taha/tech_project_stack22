package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.ApiExceptionHandler.UserNotFoundException;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyTokenRepository;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository.MyUserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements MyUserService {

    private final MyUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MyTokenRepository tokenRepository;

    public UserServiceImplementation(MyUserRepository userRepository, PasswordEncoder passwordEncoder, MyTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public List<MyUser> getUsers() {
        List<MyUser> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new UserNotFoundException("user not found !!"); // custom exception
        } else {
            return users;
        }
    }

    @Override
    public long getUserByName(String username) {
        Optional<MyUser> user = userRepository.findMyUserByUsername(username);
        if (user.isPresent()) {
            MyUser userObj = user.get();
            if (userObj.getUsername().equals(username)) {
                return userObj.getId();
            } else {
                throw new UsernameNotFoundException(username + " not found ! exception nested if !");
            }
        } else {
            throw new UsernameNotFoundException("USER Object not found !!");
        }
    }

    @Override
    public MyUser updateUser(MyUser user, long id) {
        Optional<MyUser> updated_user = userRepository.findById(id);

        if (updated_user.isPresent()) {
            MyUser updated_userObj = updated_user.get();
            updated_userObj.setFirstName(user.getFirstName());
            updated_userObj.setLastName(user.getLastName());
            updated_userObj.setUsername(user.getUsername());
            updated_userObj.setEmail(user.getEmail());

             //TODO: improvement passwordEncoder.encode(user.getPassword())
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                updated_userObj.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userRepository.save(updated_userObj);
        } else {
            throw new UserNotFoundException("user not found !!"); // custom exception
        }
    }

    @Override
    public String deleteUser(long user_id) {
        MyUser user = userRepository.getMyUserById(user_id);
//        tokenRepository.deleteById(user_id);
        if (user == null) {
            throw new UserNotFoundException("User with ID " + user_id + " not found.");
        }

        tokenRepository.deleteMyTokenByUserId(user_id);

        userRepository.delete(user);

        return "deleted user successfully "; // custom exception
    }

    @Override
    public MyUser getUserById(long id) {
        MyUser user = userRepository.getMyUserById(id);
        if (!user.equals(null)) {
            return user;
        } else {
            throw new UserNotFoundException("user not found !!"); // UserIdNotfoundException();
        }
    }

    @Override
    public Page<MyUser> findPaginated(Integer pageNo, Integer pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection
                .equals(Sort.Direction.ASC.name())
                ? Sort.by(sortField).ascending()
                : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return userRepository.findAll(pageable);
    }
}

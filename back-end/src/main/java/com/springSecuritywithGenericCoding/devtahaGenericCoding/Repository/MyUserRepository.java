package com.springSecuritywithGenericCoding.devtahaGenericCoding.Repository;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MyUserRepository extends JpaRepository<MyUser,Long> {
    Optional<MyUser> findMyUserByUsername(String username);
    MyUser getMyUserByUsername(String username);
//    Optional<MyUser> getMyUserById(Long id);
    MyUser getMyUserById(Long id);
}

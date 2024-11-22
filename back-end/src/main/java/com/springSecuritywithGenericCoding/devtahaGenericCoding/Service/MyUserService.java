package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;
import org.springframework.data.domain.Page;

import java.util.List;

public interface MyUserService {
    public List<MyUser> getUsers(); // get all users
    public long getUserByName(String username); // get id user
    public MyUser updateUser(MyUser user,long id); // update User
    public String deleteUser(long user_id); // delete user
    public MyUser getUserById(long id); // get User by id
    public Page<MyUser> findPaginated(Integer pageNo, Integer pageSize, String sortField, String sortDirection);
}

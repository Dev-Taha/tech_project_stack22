package com.springSecuritywithGenericCoding.devtahaGenericCoding.Service;

import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponse;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Authentication.AuthenticationResponseResource;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Dto.LoginForm;
import com.springSecuritywithGenericCoding.devtahaGenericCoding.Model.MyUser;

public interface AuthenticateService {
    public AuthenticationResponseResource authenticate(LoginForm user);
    public AuthenticationResponseResource createUser(MyUser user);
}

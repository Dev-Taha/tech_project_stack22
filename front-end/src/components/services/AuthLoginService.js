import axios from "axios";

const USER_API_BASE_URL_Auth = "http://localhost:8080/auth/login"

class AuthLoginService{
    // user about username,password
    loginUser(user){
        return axios.post(USER_API_BASE_URL_Auth,user);
    }
}

export default new AuthLoginService();
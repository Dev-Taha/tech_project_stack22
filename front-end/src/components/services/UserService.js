import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {
   
    getIdUserByUsername(username, access_token) {
        return axios.get(`${USER_API_BASE_URL}/username/${username}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    getUserById(id, access_token) {
        return axios.get(USER_API_BASE_URL + `/userId/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    updateUser(user, id, access_token) {
        return axios.put(USER_API_BASE_URL + `/update/${id}`, user, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }
}

export default new UserService();

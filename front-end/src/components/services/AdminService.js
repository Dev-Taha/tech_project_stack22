import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/admin";

class AdminService {
    // registration user
    getUsers(access_token) {
        return axios.get(USER_API_BASE_URL + "/users", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    deleteUser(id, access_token) {
        return axios.delete(USER_API_BASE_URL + `/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    };

    findPaginated(pageNo, sortField,sortDirection,access_token) {
        return axios.get(`${USER_API_BASE_URL}/page/${pageNo}`, {
            params: {
                sortField,
                sortDirection,
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }
    

    getUserByUsername(username, access_token) {
        return axios.get(USER_API_BASE_URL + "/username/" + username, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    getUserById(id, access_token) {
        return axios.get(USER_API_BASE_URL + `/user/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
    }

    updateUser(id, user, access_token) {
        return axios.put(USER_API_BASE_URL + `/update/${id}`, user, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        });
    }
}

export default new AdminService();

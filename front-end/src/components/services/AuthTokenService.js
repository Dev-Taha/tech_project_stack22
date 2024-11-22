import axios from "axios";

const TOKEN_API_BASE_URL_Auth = "http://localhost:8080/refreshToken";
const BACKEND_URL = "http://localhost:8080";

class AuthTokenService {
  constructor(navigate) {
    this.navigate = navigate; // Store the navigate function

    this.apiClient = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add interceptor to handle token refresh
    this.apiClient.interceptors.response.use(
      (response) => response, // Pass successful responses
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refresh_token = sessionStorage.getItem("refresh_token");
            const response = await this.refreshToken(refresh_token);

            const newAccessToken = response.data.access_token;
            sessionStorage.setItem("access_token", newAccessToken);

            // Update original request's Authorization header
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return this.apiClient(originalRequest);
          } catch (err) {
            // If refresh fails, show error and redirect to login
            console.error("Token refresh failed", err);
            alert("Your session has expired. Please log in again.");
            this.navigate("/auth/login"); // Redirect to login page
            return Promise.reject(err); // Reject the original request with the error
          }
        }

        // Handle network errors or other cases
        if (!error.response) {
          alert("Network error occurred. Please try again later.");
          return Promise.reject(error);
        }
        return Promise.reject(error); // Default rejection for all other errors
      }
    );
  }

  /**
   * Fetch a new access token using the refresh token.
   * @param {string} refreshToken - The refresh token.
   * @returns {Promise<string>} - The new access token.
   */
  async refreshToken(refreshToken) {
    try {
      const response = await axios.post(
        TOKEN_API_BASE_URL_Auth,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error(
        "Error refreshing token:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  /**
   * Get the configured Axios instance.
   * @returns {AxiosInstance} - The Axios instance for API requests.
   */
  getApiClient() {
    return this.apiClient;
  }
}

export default new AuthTokenService(); // Use singleton instance

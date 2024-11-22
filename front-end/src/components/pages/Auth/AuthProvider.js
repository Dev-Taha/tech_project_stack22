import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLoginService from "../../services/AuthLoginService";
import { useContextErrorSucessHandler } from "../Errors/ErrorSuccessProvider";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage if available
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(sessionStorage.getItem("site") || "");

  const navigate = useNavigate();
  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();

  const loginAction = (credentials) => {
    AuthLoginService.loginUser(credentials)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.access_token);

        sessionStorage.setItem("site", response.data.access_token); //sessionStorage rather than localstorage
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem(
          "username",
          response.data.user.username
        );
        sessionStorage.setItem("refresh_token", response.data.refresh_token);

        if (response.data.user.role === "USER") {
          setSuccessMessage("user login successfuly ");

          setTimeout(() => {
            setSuccessMessage(null);
            navigate("/user");
          }, 1500);
        } else if (response.data.user.role === "ADMIN") {
          setSuccessMessage("admin login successfuly");

          setTimeout(() => {
            setSuccessMessage(null);
            navigate("/dashboard");
          }, 1500);
        } else {
          setError("Invalid Credential !!");
          setTimeout(() => {
            setError(null);
            navigate("/auth/login");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status code other than 2xx
          if (error.response.status === 401) {
            setError(" 401 Unauthorized : Please check your credentials.");
          } else {
            setError(
              `Error: ${
                error.response.data.message || "An error occurred."
              } (Status: ${error.response.status})`
            );
          }
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response from the server. Please try again later.");
        } else {
          // Something else happened while setting up the request
          setError(`Error: ${error.message}`);
        }

        // Clear the error after 3 seconds
        setTimeout(() => setError(null), 3000);
      });
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("site");
    sessionStorage.removeItem("user"); // Clear user data from local storage

    setSuccessMessage("Logged out successfuly");

    setTimeout(() => {
      setSuccessMessage(null);
      setError(null);
      navigate("/");
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;

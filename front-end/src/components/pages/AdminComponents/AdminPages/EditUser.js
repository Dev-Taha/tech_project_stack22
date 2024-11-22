import "../../../css/SingUp.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import { useContextErrorSucessHandler } from "../../Errors/ErrorSuccessProvider";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ErrorIcon from "@mui/icons-material/Error";

function EditUser() {
  const [showMessage, setShowMessage] = useState(false);
  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();

  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });

  // Retrieve access token from session storage
  useEffect(() => {
    const access_token = sessionStorage.getItem("site");
    if (access_token) {
      setAccessToken(access_token);
    } else {
      setError("Access token is missing!");
      setTimeout(() => navigate("/auth/login"), 3000);
    }
  }, [navigate, setError]);

  // Fetch user data when accessToken is set // done
  useEffect(() => {
    if (!accessToken) return; // Exit if no access token

    const fetchData = async () => {
      try {
        const response = await AdminService.getUserById(id, accessToken);
        setUser(response.data);
        setSuccessMessage("Fetched user data successfully.");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      } catch (error) {
        setError(
          `Error fetching user data: ${error.response?.data || error.message}`
        );
      }
    };

    fetchData();
  }, [id, accessToken, setError, setSuccessMessage]);

  // Show or hide messages
  useEffect(() => {
    if (error || success) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("User object to update:", user);
    console.log("User ID:", id);
    console.log("Access Token:", accessToken);
  
    try {
      const response = await AdminService.updateUser(id, user, accessToken);
      console.log("API Response:", response); // Log the response
      setSuccessMessage("User updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error updating user:", error); // Log the error
      console.error("Error details:", error.response); // Log error details if available
      setError(`Error updating user: ${error.response?.data || error.message}`);
      setTimeout(() => {
        setError(null);
        navigate("/dashboard");
      }, 3000);
    }
  };  

  return (
    <div>
      <div style={{ textAlign: "center", textTransform: "lowercase" }}>
        {showMessage && error && (
          <div
            className="alert alert-danger alert-slide"
            style={{ textAlign: "center", textTransform: "lowercase" }}
          >
            <ErrorIcon /> {error}
          </div>
        )}
        {showMessage && success && (
          <div
            className="alert alert-success alert-slide"
            style={{ textAlign: "center", textTransform: "lowercase" }}
          >
            <AddTaskIcon /> {success}
          </div>
        )}
      </div>

      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Update User</h1>
          <form onSubmit={updateUser}>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="id">
                ID
              </label>
              <input
                type="number"
                name="id"
                value={user.id}
                style={styles.input}
                disabled
              />
            </div>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="role">
                Role
              </label>
              <select
                name="role"
                value={user.role}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select Role</option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={styles.button}
            >
              Update
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-danger"
              type="button"
              style={styles.button}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

const styles = {
  container: {
    padding: "1px",
    backgroundColor: "#f0f0f0",
    paddingBottom: "48px",
  },
  formContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    marginTop: "80px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "26px 20px 40px 20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
  },
  inputRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginRight: "10px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    marginTop: "20px",
    marginRight: "20px",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

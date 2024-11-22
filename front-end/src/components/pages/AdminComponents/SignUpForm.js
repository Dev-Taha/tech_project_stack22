import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";


const RegistrationPage =  () => {
  const [showMessage, setShowMessage] = useState(false);

  const  [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: ""
  });

  useEffect(() => {
    if (error || success) {
        setShowMessage(true);

        // Hide the message after 3 seconds
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [error, success]);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  }

  const saveUser = (e) => {
    e.preventDefault();
    if (user.firstName !== "" && user.lastName !== "" && user.email !== "" && user.password  !== "" && user.role !== "" && user.username !== "") {
      UserService.registerUser(user)
      .then((response) => {
      console.log(response);
      window.alert("User Registration Successfuly")
      })
      .catch((error) => {
      window.alert(error.massage);
      });
    } else {
      window.alert("please provide a valid input !!");
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      role: ""
    });
  }


  return (
    <div>

        <div style={{ textAlign: "center",textTransform: 'lowercase' }}>
                
                {showMessage && error && (
                    <div className="alert alert-danger alert-slide" style={{ textAlign: "center", textTransform: 'lowercase' }}>
                        <ErrorIcon /> {error}
                    </div>
                )}
                {showMessage && success && (
                    <div className="alert alert-success alert-slide" style={{ textAlign: "center", textTransform: 'lowercase' }}>
                        <AddTaskIcon /> {success}
                    </div>
                )}
        </div>  
      <div>
      <div style={styles.container}>
      <div style={styles.formContainer}>
      <h2 style={styles.title}>Registration Form</h2>

        {/* /* onSubmit={saveUser* /  onSubmit={handleSubmit(user)} */}
        <form > 
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={(e) =>handleChange(e)}
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
              onChange={(e) =>handleChange(e)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) =>handleChange(e)}
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
              onChange={(e) =>handleChange(e)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) =>handleChange(e)}
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
              onChange={(e) =>handleChange(e)}
              style={styles.input}
            >
              <option value="">Select Role</option>
              <option value="USER">USER</option>
            </select>
          </div>
          <button type="submit" onClick={saveUser} style={styles.button}>
            Register
          </button>
          <button onClick={reset} type="button" style={styles.button}>
            reset
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "400px",
    padding: "40px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default RegistrationPage;

import "../../css/login.css"
import "../../css/slide.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth/AuthProvider";
import { useContextErrorSucessHandler } from "./Errors/ErrorSuccessProvider";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ErrorIcon from '@mui/icons-material/Error';

function Login(){
  const [showMessage, setShowMessage] = useState(false);
  // ErrorSucessContextHandler
  const { error, setError, success, setSuccessMessage } = useContextErrorSucessHandler();
  // auth

  const [usernameFun, setUsername] = useState({
    username: ""
  });


  const auth = useAuth();

  const navigate = useNavigate();

    const handleSignUp = () =>{
      navigate("/signUp");
    };

    // done
    const [user, setUser] = useState({
      username: "",
      password: ""
    });
    // done
    const handleInputChange = (e) => {
      const value = e.target.value;
      setUser({
        ...user,
        [e.target.name]: value
      })      
    };

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
  
    const loginUser = (e) => {
      e.preventDefault();

      if (user.username !== "" && user.password !== "") {
        auth.loginAction(user);
      } else {
        setError("please enter a valid input");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    };

    
    return (
        <>
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
            <div style={styles.container}>
            <div style={styles.formContainer}>
                 
                <h2 style={styles.title}>Login</h2>
                <form >
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="email">
                    Email
                    </label>
                    <input
                    type="email"
                    name="username"
                    aria-invalid="false"
                    value={user.username}
                    onChange={(e) => handleInputChange(e)}
                    style={styles.input}
                    required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="password">
                    Password
                    </label>
                    <input
                    type="password"
                    aria-invalid="false"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleInputChange(e)}
                    style={styles.input}
                    required
                    />
                </div>
                <button type="submit" onClick={loginUser} style={styles.button}>
                    Login
                </button>
                </form>
                <p style={styles.signupText}>
                Don't have an account?{" "}
                <span style={styles.signupLink} onClick={handleSignUp}>Sign up here</span>
                </p>
            </div>
            </div>
        </>
    );
}

const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
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
    signupText: {
      textAlign: "center",
      marginTop: "20px",
      color: "#666",
    },
    signupLink: {
      color: "#007bff",
      cursor: "pointer",
    },
    
  };
  
export default Login;

// export function getUsernam () {
//     return ;
// }
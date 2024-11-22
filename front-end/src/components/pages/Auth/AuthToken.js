import "../../../css/login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthTokenService from "../../services/AuthTokenService"

function AuthToken() {
    // implements for refreshToken to update new access token after expiration 
    const [token,setToken] = useState({
        refresh_token: ""
    });
    const navigate = useNavigate();
    
    const handleInputChange = (e) =>{
        const value = e.target.value;
        setToken({
            ...token,
            [e.target.name]: value // Update the correct state
        })
    };

    const refreshTokenImplemetation = (e) => {
        e.preventDefault();
        
        // Log the refresh token for debugging
        console.log('Refresh Token being sent:', token.refresh_token); // Log the token

        AuthTokenService.refreshToken(token.refresh_token)
        .then((response) => {

          const {access_token,refresh_token} = response.data;

          console.log(response.data);
          console.log("accessToken"+access_token);
          console.log("refresh_token"+refresh_token);
          // console.log("role"+role);

          

          // const accessToken = response.data.access_token;
          // const role = response.data.role;


          // window.alert("This is the token <"+accessToken+"> you can use this token to access the resources !!");
          navigate("/user");
        })
        .catch((error) => {
          console.log(error.response);
          window.alert(error+" Unauthorized Failed to refresh the token. Please try again.");
        })
    }

    const handleRegistToken = () => {
        navigate("/signUp");
    };

    return (
            <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Authorization User</h2>
                <form>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="email">
                    RefreshToken
                    </label>
                    <input
                    type="text"
                    name="refresh_token"
                    value={token.refresh_token}
                    onChange={(e) => handleInputChange(e)}
                    style={styles.input}
                    required
                    />
                </div>
                <button type="submit" onClick={refreshTokenImplemetation} style={styles.button}>
                    RefreshToken
                </button>
                </form>
                <p style={styles.signupText}>
                Don't have a Token?{" "}
                <span style={styles.signupLink} onClick={handleRegistToken}>Go to Registration Page</span>
                </p>
            </div>
            </div>
    );
}

export default AuthToken;

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
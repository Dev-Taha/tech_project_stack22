import "../../../css/SingUp.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserService from "../../services/AuthUserService";
import { useContextErrorSucessHandler } from "../Errors/ErrorSuccessProvider";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ErrorIcon from '@mui/icons-material/Error';

function FormAdminRegistre (){
    const navigate = useNavigate();
    // ErrorSucessContextHandler
    const { error, setError, success, setSuccessMessage } = useContextErrorSucessHandler();
    const [showMessage, setShowMessage] = useState(false); 
    
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

      const  [user, setUser] = useState({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          role: ""
        });
    
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

            setSuccessMessage("user registered successfully");

            setTimeout(() => {
              setSuccessMessage(null);  // Clear the success message
              navigate("/dashboard"); // Redirect to dashboard
            }, 1000);

          })
          .catch((error) => {
            setError("Error "+error.massage);
            setTimeout(()=>{
              setError(null);
            },3000)
          });
        } else {
          setError("please provide a valid input !!");
          setTimeout(()=>{
            setError(null);
          },3000)
        }
      }
    
      const cancel = (e) => {
        // whene error message show and user click on cancel btn error message wont show on userlist page after 50mms
        setTimeout(()=>{
          setError(null);
          navigate("/userList");
        },50);
      }

    return(
          <div>
              <div style={{ textAlign: "center",textTransform: 'lowercase' }}>
          
          {showMessage && error && (
              <div className="alert alert-danger alert-slide" style={{ textAlign: "center", textTransform: 'lowercase' }}>
                  <ErrorIcon /> {error}
              </div>
          )}
          {showMessage && success && (
              <div className="alert alert-success alert-slide" style={{ textAlign: "center", textTransform: 'lowercase' }}>
                  {success } <AddTaskIcon />
              </div>
          )}
          </div>  



            <div>
            <div style={styles.container}>
                <div style={styles.formContainer}>
                <h1 style={styles.title}>Add User</h1>

                <form>
                    {/* First and Last Name on the same line */}
                    <div style={styles.inputRow}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="firstName">
                        First Name
                        </label>
                        <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        style={styles.input}
                        />
                    </div>
                    </div>

                    {/* Email and Username on the same line */}
                    <div style={styles.inputRow}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="email">
                        Email
                        </label>
                        <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        style={styles.input}
                        />
                    </div>
                    </div>

                    {/* Password and Role */}
                    <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        style={styles.input}
                    >
                        <option value="">Select Role</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option> 
                        {/* delete admin role when finish the app */}
                    </select>
                    </div>

                    <button className="btn btn-primary" type="submit" onClick={saveUser} style={styles.button}>
                    Register
                    </button>
                    <button className="btn btn-danger" onClick={cancel} type="button" style={styles.button}>
                    Cancel
                    </button>
                </form>
                </div>
            </div>
            </div>

        </div>
    );
}

export default FormAdminRegistre;

const styles = {
    container: {
      padding: '20px 20px 90px 20px',
      backgroundColor: "#f0f0f0",

    },
    formContainer: {
      maxWidth: '500px',
      margin: '0 auto',
      marginTop: '80px',
      backgroundColor: '#fff',
      borderRadius: '15px',
      padding: '26px 20px 40px 20px',
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",

    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
    },
    inputRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      marginRight: '10px',
    },
    label: {
      marginBottom: '5px',
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      marginTop: '20px',
      marginRight: '20px',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  
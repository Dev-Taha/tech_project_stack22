import "../../css/slide.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthProvider";
import { useContextErrorSucessHandler } from "./Errors/ErrorSuccessProvider";
import UserService from "../services/UserService";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ErrorIcon from "@mui/icons-material/Error";
import MenuIcon from "@mui/icons-material/Menu"; // Icon for the sidebar toggle
import CloseIcon from "@mui/icons-material/Close"; // Icon for the sidebar toggle
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for Account
import InfoIcon from "@mui/icons-material/Info"; // Icon for Your Info
import SecurityIcon from "@mui/icons-material/Security"; // Icon for Security
import MessageIcon from "@mui/icons-material/Message"; // Icon for Messages
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"; // Icon for Privacy
import AuthTokenService from "../services/AuthTokenService";

function UserProfilepage() {
  const [userData, setUserData] = useState([]);

  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const [getUserame, setUsername] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const data = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // State to track sidebar visibility
  const [isHovered, setIsHovered] = useState(false);

  const authTokenService = AuthTokenService;

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const access_token = sessionStorage.getItem("site");
    if (access_token) {
      setAccessToken(access_token);
      fetchData(); // Fetch data if access token is valid
    } else if (!access_token) {
      setError("Access token is missing!");
      setTimeout(() => navigate("/auth/login"), 3000);

      return; // Exit early if no access token
    } else {
      setError("an Error Ocurred pleas check your connection !!");
    }
  }, [navigate, accessToken]);

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

  // Reusable function for error handling
  const handleError = (error) => {
    if (error) {
      setError("Session expired. pleas login again...");
      setTimeout(() => {
        setError(null);
        navigate("/auth/login");
      }, 3000);
    }
  };

  // Fetches user ID based on username
  const getIdUsername = async () => {
    const username = sessionStorage.getItem("username");

    if (username) {
      try {
        const response = await UserService.getIdUserByUsername(
          username,
          accessToken
        );
        return response.data;
      } catch (error) {
        handleError(error);
      }
    }
  };

  const fetchData = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const id = await getIdUsername();
      if (id) {
        const response = await UserService.getUserById(id, accessToken);
        setUserData(response.data);
      }
    } catch (error) {
      setError("an error acouured");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const logOutHandler = () => {
    sessionStorage.removeItem("access_token"); // Clear the access token
    sessionStorage.removeItem("refresh_token"); // Clear the refresh token
    setSuccessMessage("logged out successfuly");
    setTimeout(() => {
      setSuccessMessage(null);
      navigate("/"); // Redirect to login page
    }, 3000);
  };

  const onEdit = () => {};

  return (
    <div style={styles.pageContainer}>
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

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarBrand}>Welcome {userData.username}</div>
        <div style={styles.navLinks}>
          <button onClick={logOutHandler} style={styles.navLink}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.contentContainer}>
        {/* Sidebar */}
        <aside
          style={{
            ...styles.sidebar,
            width: isSidebarExpanded ? "250px" : "60px",
          }}
        >
          <button style={styles.toggleButton} onClick={toggleSidebar}>
            {isSidebarExpanded ? <CloseIcon /> : <MenuIcon />}
          </button>
          {isSidebarExpanded && <h3 style={styles.sidebarTitle}></h3>}
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem}>
              {isSidebarExpanded ? (
                <AccountCircleIcon style={styles.icon} />
              ) : (
                <AccountCircleIcon style={styles.iconSmall} />
              )}
              {isSidebarExpanded && "Account"}
            </li>
            <li style={styles.sidebarListItem}>
              {isSidebarExpanded ? (
                <InfoIcon style={styles.icon} />
              ) : (
                <InfoIcon style={styles.iconSmall} />
              )}
              {isSidebarExpanded && "Your Info"}
            </li>
            <li style={styles.sidebarListItem}>
              {isSidebarExpanded ? (
                <SecurityIcon style={styles.icon} />
              ) : (
                <SecurityIcon style={styles.iconSmall} />
              )}
              {isSidebarExpanded && "Security"}
            </li>
            <li style={styles.sidebarListItem}>
              {isSidebarExpanded ? (
                <MessageIcon style={styles.icon} />
              ) : (
                <MessageIcon style={styles.iconSmall} />
              )}
              {isSidebarExpanded && "Messages"}
            </li>
            <li style={styles.sidebarListItem}>
              {isSidebarExpanded ? (
                <PrivacyTipIcon style={styles.icon} />
              ) : (
                <PrivacyTipIcon style={styles.iconSmall} />
              )}
              {isSidebarExpanded && "Privacy"}
            </li>
          </ul>
        </aside>
        {/* Main Profile Content */}
        <div style={styles.profileContent}>
          <div style={styles.profileHeader}>
            <img
              src="https://cdn0.iconfinder.com/data/icons/interface-20/24/ui_interface_user_user_interface_person-512.png"
              alt="User Profile"
              style={styles.profileImage}
            />
            <div style={styles.userInfo}>
              <h2 style={styles.userName}>
                {userData.firstName} {userData.lastName}
              </h2>
              <hr></hr>
              <p style={styles.userId}>Your ID : {userData.id}</p>
            </div>
          </div>

          {/* User Card Section */}
          <div style={styles.userCard}>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <h1 style={styles.cardLabel}>Full name</h1>
              </div>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardFullName}>
                  {userData.username} {userData.lastName}
                </h3>
              </div>
              <div style={styles.cardButtonContainer}>
                <button style={styles.cardEditButton}>Edit Name</button>
              </div>
            </div>
          </div>

          {/* Profile Info Card Section */}
          <div style={styles.infoCard}>
            <div style={styles.cardContent22}>
              <div style={styles.cardInfo}>
                <h1 style={styles.cardLabel}>Profile info</h1>
              </div>
              <div style={styles.cardInfo}></div>
              <div style={styles.cardButtonContainer}>
                <button
                  style={styles.cardEditButton}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Edit profile info
                </button>
              </div>
            </div>
            <hr></hr>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <p style={styles.cardLabel2}>First name</p>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>{userData.firstName}</p>
              </div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <p style={styles.cardLabel2}>Last name</p>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>{userData.lastName}</p>
              </div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <p style={styles.cardLabel2}>Username</p>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>{userData.username}</p>
              </div>
            </div>
          </div>

          {/* Account Info Card Section */}
          <div style={styles.accountCard}>
            <h1 style={styles.accountCardTitle}>Account info</h1>
            <hr></hr>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <h6 style={styles.cardLabel2}>Email address</h6>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}> {userData.email}</p>
              </div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <h6 style={styles.cardLabel2}>AccountNonLocked</h6>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>
                  {" "}
                  {userData.AccountNonLocked ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <h6 style={styles.cardLabel2}>Enabled</h6>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>
                  {" "}
                  {userData.enabled ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div style={styles.cardContent}>
              <div style={styles.cardInfo}>
                <h6 style={styles.cardLabel2}>AccountNonExpired</h6>
              </div>
              <div style={styles.cardInfo}>
                <p style={styles.cardFullName}>
                  {" "}
                  {userData.AccountNonExpired ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated CSS-in-JS styles
const styles = {
  accountCard: {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  accountCardTitle: {
    margin: "0 0 10px 0",
    color: "#555",
    textOverflow: "ellipsis",
    fontSize: "14px",
    fontWeight: "600",
    color: "rgb(50, 49, 48)",
    display: "inline",
    lineHeight: "1.4",
  },
  accountList: {
    listStyle: "none",
    padding: 0,
    color: "#555",
  },

  infoCard: {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  infoCardTitle: {
    margin: "0 0 10px 0",
    fontSize: "1.5em",
    color: "#0078D4",
  },
  infoList: {
    listStyle: "none",
    padding: 0,
    color: "#555",
  },

  userCard: {
    width: "100%",
    marginTop: "20px",
    backgroundColor: "#f1f1f1",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between", // Distribute space between items
    alignItems: "center", // Align items vertically
  },
  cardContent: {
    display: "flex",
    flexGrow: 1, // Allow the content to grow
    alignItems: "center", // Center the items
    justifyContent: "space-between", // Space between items
  },
  cardContent22: {
    display: "flex",
    flexGrow: 1, // Allow the content to grow
    alignItems: "center", // Center the items
    backgroundColor: "#f1f1f1",
  },
  cardInfo: {
    display: "flex",
    // justifyContent: 'center', // Center the text
    width: "100%",
  },
  cardLabel: {
    color: "#555",
    textOverflow: "ellipsis",
    fontSize: "14px",
    fontWeight: "600",
    color: "rgb(50, 49, 48)",
    display: "inline",
    lineHeight: "1.4",
  },

  cardLabel2: {
    // margin: '0 0 10px 0',
    color: "#555 !important",
    textOverflow: "ellipsis !important",
    fontSize: "15px !important",
    fontWeight: "lighter !important",
    color: "rgb(50, 49, 48) !important",
    display: "inline !important",
    lineHeight: "1.4 !important",
  },
  cardFullName: {
    margin: "0",
    fontSize: "1em",
    color: "#333",
    textAlign: "center", // Center text
    textOverflow: "ellipsis",
    fontWeight: "600",
    display: "inline",
    lineHeight: "1.4",
  },
  cardButtonContainer: {
    display: "flex",
    justifyContent: "flex-end", // Align button to the right
    width: "100%",
  },
  cardEditButton: {
    // backgroundColor: '#0078D4',
    color: "rgb(0, 84, 153)",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background 0.3s",
  },

  pageContainer: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f9f9fb",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0078D4",
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  navbarBrand: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    color: "#0078D4",
    // textDecoration: 'none',
    // fontWeight: 'bold',
    padding: "5px 10px",
    borderRadius: "5px",
    transition: "background 0.3s",
    borderColor: "#0078D4", // Border color
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    padding: "20px",
  },
  sidebar: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginRight: "20px",
    transition: "width 0.3s", // Smooth transition for width
  },

  toggleButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    padding: "5px",
    transition: "transform 0.2s", // Transition for hover effect
    margin: "-7px",
  },
  toggleButtonHover: {
    transform: "scale(1.1)", // Slightly enlarge button on hover
  },

  sidebarTitle: {
    color: "#0078D4",
    fontSize: "1.2em",
    marginBottom: "15px",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    color: "#555",
    lineHeight: "1.8em",
  },
  sidebarTitle: {
    color: "#0078D4",
    fontSize: "1.2em",
    marginBottom: "15px",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    color: "#555",
    lineHeight: "1.8em",
  },
  sidebarListItem: {
    display: "flex",
    alignItems: "center",
    padding: "5px 0",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "15px",
  },
  sidebarListItemHover: {
    backgroundColor: "#f0f0f0",
  },
  icon: {
    marginRight: "10px",
    color: "#0078D4", // Icon color
    fontSize: "1.5em", // Adjust size for expanded view
  },
  iconSmall: {
    marginRight: "10px",
    color: "#0078D4",
    fontSize: "1.5em", // Same size for collapsed view
  },
  sidebarListItemHover: {
    backgroundColor: "red", // Light gray background on hover
  },
  profileContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "flex-start", // Align content to the top
    flexDirection: "column",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginRight: "20px",
    border: "3px solid white",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontSize: "1.2em",
    color: "#333",
    marginBottom: "5px",
  },
  userId: {
    fontSize: "1em",
    color: "#666",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "1.2em",
    color: "#0078D4",
  },
};

export default UserProfilepage;

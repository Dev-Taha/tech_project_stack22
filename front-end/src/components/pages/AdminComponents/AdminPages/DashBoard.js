import "../../../css/slide.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ErrorIcon from "@mui/icons-material/Error";
import MenuIcon from "@mui/icons-material/Menu"; // Icon for the sidebar toggle
import CloseIcon from "@mui/icons-material/Close"; // Icon for the sidebar toggle
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon for Account
import SecurityIcon from "@mui/icons-material/Security"; // Icon for Security
import MessageIcon from "@mui/icons-material/Message"; // Icon for Messages
import { useContextErrorSucessHandler } from "../../Errors/ErrorSuccessProvider";
import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // New icon for "Add User"
import GroupIcon from "@mui/icons-material/Group"; // New icon for "Users"
import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js

function Dashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);
  const navigate = useNavigate();

  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();
  const [showMessage, setShowMessage] = useState(false);

  const [adminData, setAdminData] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const data = JSON.parse(sessionStorage.getItem("user") || "{}");

  // Navigation functions
  const handleAccountClick = () => navigate("/account");
  const handleSecurityClick = () => navigate("/security");
  const handleMessagesClick = () => navigate("/messages");
  const handleAddUserClick = () => navigate("/addUser");
  const handleUsersClick = () => navigate("/users");

  // State to manage counts
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [deletedUsers, setDeletedUsers] = useState(0);

  // Fetch and set data (replace with your actual data fetching logic)
  useEffect(() => {
    // Simulating data fetch
    setUserCount(100); // Example: Total number of users
    setAdminCount(10); // Example: Number of admin users
    setVerifiedUsers(80); // Example: Number of verified users
    setDeletedUsers(5); // Example: Number of deleted users
  }, []);

  // Data for the Pie chart
  const pieData = {
    labels: ["Admins", "Verified Users", "Deleted Users", "Regular Users"],
    datasets: [
      {
        label: "User Classification",
        data: [
          adminCount,
          verifiedUsers,
          deletedUsers,
          userCount - adminCount - verifiedUsers - deletedUsers,
        ],
        backgroundColor: ["#0078D4", "#28a745", "#dc3545", "#ffc107"],
        hoverOffset: 4,
      },
    ],
  };

  // Options for the Pie chart
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    const access_token = sessionStorage.getItem("site");
    // console.log("Fetched access token from sessionStorage:", access_token); // Debug log
    if (access_token) {
      // this for update the  state
      setAccessToken(access_token);
      setAdminData(data);
    } else if (!access_token) {
      setError("Access token is missing!");
      // // setShowMessage(true);
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

  const auth = useAuth();
  const logOutHandler = () => {
    auth.logOut();
  };

  return (
    <div style={styles.pageContainer}>
      {/* Messages */}
      <div style={{ textAlign: "center", textTransform: "lowercase" }}>
        {showMessage && error && (
          <div className="alert alert-danger alert-slide">
            <ErrorIcon /> {error}
          </div>
        )}
        {showMessage && success && (
          <div className="alert alert-success alert-slide">
            <AddTaskIcon /> {success}
          </div>
        )}
      </div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarBrand}>Dashboard</div>
        <div style={styles.navLinks}>
          <button style={styles.navLink} onClick={logOutHandler}>
            LogOut
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
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarListItem} onClick={handleAccountClick}>
              <AccountCircleIcon style={styles.icon} />
              {isSidebarExpanded && "Account"}
            </li>
            <li style={styles.sidebarListItem} onClick={handleSecurityClick}>
              <SecurityIcon style={styles.icon} />
              {isSidebarExpanded && "Security"}
            </li>
            <li style={styles.sidebarListItem} onClick={handleMessagesClick}>
              <MessageIcon style={styles.icon} />
              {isSidebarExpanded && "Messages"}
            </li>

            {/* New Sidebar Items */}
            <li style={styles.sidebarListItem} onClick={handleAddUserClick}>
              <PersonAddIcon style={styles.icon} />
              {isSidebarExpanded && "Add User"}
            </li>
            <li style={styles.sidebarListItem} onClick={handleUsersClick}>
              <GroupIcon style={styles.icon} />
              {isSidebarExpanded && "Users"}
            </li>
          </ul>
        </aside>

        <div style={styles.dashboardContainer}>
          <h2 style={styles.dashboardHeader}>Admin Dashboard</h2>

          <div style={styles.statsContainer}>
            <div style={styles.statBox}>
              <h3>Total Users</h3>
              <p>{userCount}</p>
            </div>
            <div style={styles.statBox}>
              <h3>Total Admins</h3>
              <p>{adminCount}</p>
            </div>
            <div style={styles.statBox}>
              <h3>Verified Users</h3>
              <p>{verifiedUsers}</p>
            </div>
            <div style={styles.statBox}>
              <h3>Deleted Users</h3>
              <p>{deletedUsers}</p>
            </div>
          </div>

          <div style={styles.chartContainer}>
            <h3>User Classification</h3>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
// Updated CSS-in-JS styles
const styles = {
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
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#005a9e",
    cursor: "pointer",
    transition: "background-color 0.3s",
    border: "none",
    ":hover": {
      backgroundColor: "#004578",
    },
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
    transition: "width 0.3s",
    overflow: "hidden",
    height: "100vh",
  },
  toggleButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
    padding: "5px",
    transition: "transform 0.2s",
    margin: "-7px",
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
    padding: "10px 0",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s",
    ":hover": {
      backgroundColor: "#e0e0e0",
    },
  },
  icon: {
    marginRight: "10px",
    color: "#0078D4",
    fontSize: "1.5em",
  },
  profileContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    borderRadius: "8px",
  },
  tableRow: {
    ":nth-child(even)": {
      backgroundColor: "#f2f2f2",
    },
  },
  tableHeader: {
    backgroundColor: "#0078D4",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
    color: "#555",
  },
  verifiedIcon: {
    color: "green",
    fontSize: "1.5em",
  },
  notVerifiedIcon: {
    color: "red",
    fontSize: "1.5em",
  },
  actionIcon: {
    fontSize: "1.2em",
    cursor: "pointer",
    margin: "0 5px",
  },
  editIcon: {
    color: "green", // Green color for edit icon
    ":hover": {
      color: "#005500", // Darker green on hover
    },
  },
  deleteIcon: {
    color: "red", // Red color for delete icon
    ":hover": {
      color: "#550000", // Darker red on hover
    },
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
  },
  userId: {
    fontSize: "1em",
    color: "#666",
  },
  dashboardContainer: {
    padding: "30px",
    backgroundColor: "#f9f9fb",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width:"100%"
  },
  dashboardHeader: {
    fontSize: "1.8em",
    marginBottom: "20px",
    color: "#333",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
  },
  statBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    flex: 1,
    margin: "0 10px",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    height:"500px",
    width:"100%"
  },
};

export default Dashboard;

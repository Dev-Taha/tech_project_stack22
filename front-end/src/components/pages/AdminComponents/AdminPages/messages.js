import "../../../css/slide.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { FaTrash, FaReply } from "react-icons/fa"; // Import icons once


function Messages() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);
  const navigate = useNavigate();

  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();
  const [showMessage, setShowMessage] = useState(false);

  const [adminData, setAdminData] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const [messages, setMessages] = useState([]);

  const data = JSON.parse(sessionStorage.getItem("user") || "{}");

  // Navigation functions
  const handleAccountClick = () => navigate("/account");
  const handleSecurityClick = () => navigate("/security");
  const handleMessagesClick = () => navigate("/messages");
  const handleAddUserClick = () => navigate("/addUser");
  const handleUsersClick = () => navigate("/users");

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

  
  // Simulating fetching messages from a server or API
  useEffect(() => {
    const fetchedMessages = [
      {
        id: 1,
        sender: "John Doe",
        subject: "Project Update",
        content: "Hey, just wanted to share some updates on the project.",
        timestamp: "2024-11-18 12:34",
      },
      {
        id: 2,
        sender: "Jane Smith",
        subject: "Meeting Reminder",
        content: "Don't forget our meeting tomorrow at 10 AM.",
        timestamp: "2024-11-17 15:30",
      },
    ];
    setMessages(fetchedMessages);
  }, []);

  const handleDeleteMessage = (id) => {
    // Logic for deleting a message
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    setSuccessMessage("Message deleted successfully!");
  };

  const handleReplyMessage = (sender) => {
    // Logic for replying to a message
    navigate(`/messages/reply?to=${encodeURIComponent(sender)}`);
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
        <div style={styles.profileContent}>
          <div style={styles.pageContainer}>
            <h2 style={styles.header}>Messages</h2>
            {error && (
              <div className="alert alert-danger" style={styles.alert}>
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" style={styles.alert}>
                {success}
              </div>
            )}

            <div style={styles.messagesList}>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id} style={styles.messageCard}>
                    <div style={styles.messageHeader}>
                      <h5 style={styles.messageSubject}>{msg.subject}</h5>
                      <span style={styles.timestamp}>{msg.timestamp}</span>
                    </div>
                    <p style={styles.messageSender}>From: {msg.sender}</p>
                    <p style={styles.messageContent}>{msg.content}</p>
                    <div style={styles.messageActions}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleReplyMessage(msg.sender)}
                        style={styles.replyButton}
                      >
                        <FaReply /> Reply
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteMessage(msg.id)}
                        style={styles.deleteButton}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.noMessages}>No messages to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Updated CSS-in-JS styles
const styles = {
  pageContainer: {
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  header: {
    fontSize: "1.8em",
    marginBottom: "20px",
  },
  alert: {
    marginBottom: "20px",
  },
  messagesList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  messageCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  messageSubject: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: "0.8em",
    color: "#888",
  },
  messageSender: {
    fontWeight: "bold",
  },
  messageContent: {
    marginBottom: "10px",
  },
  messageActions: {
    display: "flex",
    gap: "10px",
  },
  replyButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  noMessages: {
    textAlign: "center",
    color: "#666",
  },
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
    width: "100%",
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
    height: "500px",
    width: "100%",
  },
};

export default Messages;

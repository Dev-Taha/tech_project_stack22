// src/components/TableBody.js
import React, { useEffect, useState } from "react";
import UserData from "./UserData";
import AdminService from "../../../services/AdminService";
import { useContextErrorSucessHandler } from "../../Errors/ErrorSuccessProvider";

const TableBody = ({ styles }) => {
  //loading handle
  const [loading, setLoading] = useState(true);

  // paging for users
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");

  //token
  const access_token = sessionStorage.getItem("site");

  // ErrorSucessContextHandler
  const { error, setError, success, setSuccessMessage } =
    useContextErrorSucessHandler();
  const [showMessage, setShowMessage] = useState(false);

  // users
  const [users, setUsers] = useState([]); // Initialize users as an empty array

  // State to manage delete confirmation
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // fetching user handling
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await AdminService.findPaginated(
        pageNo,
        sortField,
        sortDirection,
        access_token
      );
      // Corrected destructuring
      const { content, totalPages } = res.data;
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setError("Error fetching users : ", error.message);
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  // token handling for missing token
  useEffect(() => {
    setSuccessMessage(null);
    if (access_token) {
      fetchUsers();
    } else {
      setError("access token missing");
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [pageNo, sortField, sortDirection, access_token]); //acess token

  //handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNo(newPage);
    }
  };
  // delete user handling
  const deleteUser = async (e, id) => {
    e.preventDefault();
    try {
      await AdminService.deleteUser(deleteUserId, access_token); // Make sure this function exists in AdminService
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUserId));

      setSuccessMessage(`User with ID ${deleteUserId} deleted successfully`);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError(`Error deleting user: ${error.message}`);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setShowConfirmDialog(false); // Close the dialog
    }
  };

  // Handle cancel delete
  const cancelDelete = () => {
    setShowConfirmDialog(false); // Close the dialog
  };

  // Show confirmation dialog
  const confirmDelete = (userId) => {
    setDeleteUserId(userId); // Set the user ID to delete
    setShowConfirmDialog(true); // Show the dialog
  };

  return (
    <>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableRow}>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>First Name</th>
            <th style={styles.tableHeader}>Last Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Role</th>
            <th style={styles.tableHeader}>Verified</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        {!loading ? (
          <tbody>
            {users.map((user) => (
              <UserData
                styles={styles}
                user={user}
                key={user.id}
                deleteFunc={() => confirmDelete(user.id)}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="8" className="text-center">
                Loading...
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            textAlign: "center",
            minWidth: "300px",
            transition: "all 0.3s ease",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Are you sure you want to delete this user?
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <button
              onClick={deleteUser}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              style={{
                backgroundColor: "#95a5a6",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7f8c8d")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#95a5a6")}
            >
              No, Cancel
            </button>
          </div>
        </div>
      )}
      {/* Aligning the nav element to the end */}
      <div className="d-flex justify-content-end" style={{ marginTop: "20px" }}>
        <nav aria-label="Pagination">
          <ul className="pagination">
            <li className={`page-item ${pageNo === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                onClick={() => handlePageChange(pageNo - 1)}
                aria-disabled={pageNo === 1}
              >
                Previous
              </a>
            </li>

            {/* Dynamically rendered page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${pageNo === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${pageNo === totalPages ? "disabled" : ""}`}
            >
              <a
                className="page-link"
                onClick={() => handlePageChange(pageNo + 1)}
                aria-disabled={pageNo === totalPages}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableBody;

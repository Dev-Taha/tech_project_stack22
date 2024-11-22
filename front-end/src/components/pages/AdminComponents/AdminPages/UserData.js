import { FaCheckCircle, FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const UserData = ({ styles, user, deleteFunc }) => {
  const navigate = useNavigate();

  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/editUser/${id}`);
  };  
  return (
      <tr key={user.id} style={styles.tableRow}>
        <td style={styles.tableCell}>{user.id}</td>
        <td style={styles.tableCell}>{user.firstName}</td>
        <td style={styles.tableCell}>{user.lastName}</td>
        <td style={styles.tableCell}>{user.email}</td>
        <td style={styles.tableCell}>{user.username}</td>
        <td style={styles.tableCell}>{user.role}</td>
        <td style={styles.tableCell}>
          {user.verified ? (
            <FaCheckCircle
              style={{ color: "green", fontSize: "1.5em" }}
              title="Verified"
            />
          ) : (
            <FaTimesCircle
              style={{ color: "red", fontSize: "1.5em" }}
              title="Not Verified"
            />
          )}
        </td>
        <td style={styles.tableCell}>
          <FaEdit
            style={{ ...styles.actionIcon, ...styles.editIcon }}
            title="Edit"
            onClick={(e) => editUser(e, user.id)}
          />
          <FaTrash
            style={{ ...styles.actionIcon, ...styles.deleteIcon }}
            title="Delete"
            onClick={(e) => deleteFunc(e, user.id)}
          />
        </td>
      </tr>
  );
};

export default UserData;

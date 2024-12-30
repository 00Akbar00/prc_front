import React, { useState, useEffect } from "react";
import { getUsers } from '@/services/userServices';
import Box from './box/box'; // Import the Box component

const Table = ({ style }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddSlipClick = (user) => {
    setSelectedUser(user);
    setBoxVisible(true); // Show the Box when the "Add Slip" button is clicked
  };

  const handleCloseBox = () => {
    setBoxVisible(false); // Hide the Box when the close action is triggered
  };

  return (
    <div style={style.tableContainer}>
      <h1 style={{ ...style.tableTitle, marginBottom: '20px' }}>User Salary Slips</h1>
      <table style={style.table}>
        <thead>
          <tr style={style.tableHeader}>
            <th style={style.tableHeaderCell}>ID</th>
            <th style={style.tableHeaderCell}>Name</th>
            <th style={style.tableHeaderCell}>Email</th>
            <th style={style.tableHeaderCell}>View Slip</th>
            <th style={style.tableHeaderCell}>Add Slip</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={style.tableRow}>
              <td style={style.tableCell}>{user.id}</td>
              <td style={style.tableCell}>{user.name}</td>
              <td style={style.tableCell}>{user.email}</td>
              <td style={style.tableCell}>
                <button
                  className="button"
                  style={style.actionButton}
                  onClick={() => alert(`Viewing slip for ${user.name}`)}
                >
                  View Slip
                </button>
              </td>
              <td style={style.tableCell}>
                <button
                  className="button"
                  style={style.actionButton}
                  onClick={() => handleAddSlipClick(user)}
                >
                  Add Slip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isBoxVisible && (
        <Box
        onClose={handleCloseBox} // Pass the handleCloseBox function to Box
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1000',
          maxWidth: '1200px',
          width: '100%',
          padding: '30px',
          backgroundColor: '#eaf6ff', 
          border: '1px solid #b3d9ff', 
          borderRadius: '12px', // Rounded corners for a modern look
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for a floating effect
          color: '#003366', // Dark blue text color for contrast
          overflow: 'hidden', // Prevent content overflow
        }}
      >
          <h2>Add Salary Slip for {selectedUser?.name}</h2>
          <button onClick={() => alert(`Adding slip for ${selectedUser?.name}`)} style={{ marginTop: '10px' }}>
            Add Slip
          </button>
        </Box>
      )}
    </div>
  );
};

export default Table;

import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/userServices';
import Box from '../box/box'; // Import the Box component
import { styles } from './tableStyle';

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
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddSlipClick = (user) => {
    setSelectedUser(user);
    setBoxVisible(true);
  };

  const handleCloseBox = () => {
    setBoxVisible(false);
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
        <Box onClose={handleCloseBox}>
          <h2>Add Salary Slip for {selectedUser?.name}</h2>
          <button
            onClick={() => alert(`Adding slip for ${selectedUser?.name}`)}
            //style={{ marginTop: '10px' }}
          >
            Add Slip
          </button>
        </Box>
      )}
    </div>
  );
};

export default Table;

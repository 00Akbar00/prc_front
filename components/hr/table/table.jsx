import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/userServices';
import AddSlipForm from './addSlipForm';
import ManageSlip from './manageSlip';

const Table = ({ style }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddSlipBoxVisible, setAddSlipBoxVisible] = useState(false);
  const [isManageSlipBoxVisible, setManageSlipBoxVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response.data.users);
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
    setAddSlipBoxVisible(true);
  };

  const handleManageSlipClick = (user) => {
    setSelectedUser(user);
    setManageSlipBoxVisible(true);
  };

  const handleCloseBox = () => {
    setAddSlipBoxVisible(false);
    setManageSlipBoxVisible(false);
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
                {user.salaries.length > 0 ? (
                  <button
                    className="button"
                    style={style.actionButton}
                    onClick={() => handleManageSlipClick(user)}
                  >
                    Manage Slips
                  </button>
                ) : null}
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

      {isAddSlipBoxVisible && (
        <AddSlipForm
          user={selectedUser}
          onClose={handleCloseBox}
        />
      )}
      
      {isManageSlipBoxVisible && (
        <ManageSlip
          user={selectedUser}
          onClose={handleCloseBox}
        />
      )}
    </div>
  );
};

export default Table;

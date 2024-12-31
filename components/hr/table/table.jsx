import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/userServices';
import Box from '../box/box'; // Import the Box component
import { styles } from './tableStyle';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Table = ({ style }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    basicSalary: '',
    deductions: '',
    netSalary: '',
    month: '',
    year: '',
    userId: '',
  });

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
    setFormData({ ...formData, userId: user.id });
    setBoxVisible(true);
  };

  const handleCloseBox = () => {
    setBoxVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('/api/salary', formData);
    //   console.log(response.data);
    //   handleCloseBox();
    // } catch (error) {
    //   console.error('Error adding salary slip:', error);
    // }
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
                    onClick={() => alert(`Viewing slip for ${user.name}`)}
                  >
                    View Slip
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
  
      {isBoxVisible && (
        <Box onClose={handleCloseBox}>
          <h2>Add Salary Slip for {selectedUser?.name}</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Basic Salary"
              name="basicSalary"
              type="number"
              value={formData.basicSalary}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Deductions"
              name="deductions"
              type="number"
              value={formData.deductions}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Net Salary"
              name="netSalary"
              type="number"
              value={formData.netSalary}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Month</InputLabel>
              <Select
                name="month"
                value={formData.month}
                onChange={handleChange}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                {/* Add other months as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                View Slip
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Salary Slip
              </Button>
            </div>
          </form>
        </Box>
      )}
    </div>
  );
  
};

export default Table;

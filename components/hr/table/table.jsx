import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/userServices';
import Box from '../box/box'; // Import the Box component
import { styles } from './tableStyle';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Table = ({ style }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBoxVisible, setBoxVisible] = useState(false);
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
    formik.resetForm();
    formik.setFieldValue('userId', user.id);
    setBoxVisible(true);
  };

  const handleCloseBox = () => {
    setBoxVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      basicSalary: '',
      deductions: '',
      netSalary: '',
      month: '',
      year: '',
      userId: '',
    },
    validationSchema: Yup.object({
      basicSalary: Yup.number().required('Basic Salary is required').positive('Must be positive'),
      deductions: Yup.number().positive('Must be positive'),
      netSalary: Yup.number().required('Net Salary is required').positive('Must be positive'),
      month: Yup.string().required('Month is required'),
      year: Yup.number().required('Year is required').min(2000, 'Year must be after 2000').max(new Date().getFullYear(), 'Year cannot be in the future'),
      userId: Yup.string().required('User ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Submitting:', values);
        // const response = await axios.post('/api/salary', values);
        // console.log(response.data);
        handleCloseBox();
      } catch (error) {
        console.error('Error adding salary slip:', error);
      }
    },
  });

  const handleSubmitButtonClick = () => {
    // Mark all fields as touched to show all errors
    formik.setTouched({
      basicSalary: true,
      deductions: true,
      netSalary: true,
      month: true,
      year: true,
      userId: true,
    });
  
    // Trigger Formik's submit handling
    formik.handleSubmit();
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Basic Salary"
              name="basicSalary"
              // type="number"
              value={formik.values.basicSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.basicSalary && Boolean(formik.errors.basicSalary)}
              helperText={formik.touched.basicSalary && formik.errors.basicSalary}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Deductions"
              name="deductions"
              //type="number"
              value={formik.values.deductions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.deductions && Boolean(formik.errors.deductions)}
              helperText={formik.touched.deductions && formik.errors.deductions}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Net Salary"
              name="netSalary"
              //type="number"
              value={formik.values.netSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.netSalary && Boolean(formik.errors.netSalary)}
              helperText={formik.touched.netSalary && formik.errors.netSalary}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Month</InputLabel>
              <Select
                name="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.month && Boolean(formik.errors.month)}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                {/* Add other months as needed */}
              </Select>
              {formik.touched.month && formik.errors.month && (
                <p style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.month}</p>
              )}
            </FormControl>
            <TextField
              label="Year"
              name="year"
              //type="number"
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              fullWidth
              margin="normal"
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
              View Slip
            </Button>
             <Button 
                type="button" 
                variant="contained" 
                color="primary" 
                onClick={handleSubmitButtonClick}>
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

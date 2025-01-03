import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Box from "../box/box";
import { getSalary, deleteSalary } from "@/services/salaryServices"; // Ensure you have the correct import

const ManageSlip = ({ user, onClose }) => {
  const [salarySlips, setSalarySlips] = useState([]);

  useEffect(() => {
    const getSalaries = async () => {
      try {
        if (user?.id) {
          // Use the getSalary function to fetch salary details based on user ID
          const response = await getSalary(user.id);
          console.log("Fetched salary data:", response.data); // Log the data to inspect it

          // Ensure that response.data is an array
          if (response.success && Array.isArray(response.data)) {
            setSalarySlips(response.data);  // If it's an array, set salarySlips
          } else {
            console.error("Error: Expected an array of salary slips, but got:", response.data);
            setSalarySlips([]);  // Set to an empty array if data is not as expected
          }
        }
      } catch (error) {
        console.error("Error fetching salary slips:", error);
        setSalarySlips([]);  // Set to empty array in case of error
      }
    };

    if (user?.id) {
      getSalaries();
    }
  }, [user?.id]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary slip?")) {
      try {
        const response = await deleteSalary(id); // Ensure `id` is passed properly
        if (response.success) {
          setSalarySlips((prev) => prev.filter((slip) => slip.id !== id)); // Update state after successful deletion
          alert("Salary slip deleted successfully.");
        } else {
          alert(response.message || "Failed to delete salary slip.");
        }
      } catch (error) {
        console.error("Error deleting salary slip:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salarySlips.length > 0 ? (
              salarySlips.map((slip) => (
                <TableRow key={slip.id}>
                  <TableCell>{slip.id}</TableCell>
                  <TableCell>{slip.month || "N/A"}</TableCell>
                  <TableCell>{slip.year}</TableCell>
                  <TableCell>{slip.basicSalary}</TableCell>
                  <TableCell>{slip.deductions}</TableCell>
                  <TableCell>{slip.netSalary}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => console.log("Edit", slip)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(slip.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No salary slips available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        style={{ marginTop: "20px" }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ManageSlip;

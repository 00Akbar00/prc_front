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
  TextField,
} from "@mui/material";
import Box from "../box/box";
import { getSalary, deleteSalary, updateSalary } from "@/services/salaryServices";

const ManageSlip = ({ user, onClose }) => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [editedSlips, setEditedSlips] = useState({});

  useEffect(() => {
    const getSalaries = async () => {
      try {
        if (user?.id) {
          const response = await getSalary(user.id);
          if (response.success && Array.isArray(response.data)) {
            setSalarySlips(response.data);
          } else {
            console.error("Expected an array of salary slips, but got:", response.data);
            setSalarySlips([]);
          }
        }
      } catch (error) {
        console.error("Error fetching salary slips:", error);
        setSalarySlips([]);
      }
    };

    if (user?.id) {
      getSalaries();
    }
  }, [user?.id]);

  const handleInputChange = (id, field, value) => {
    setEditedSlips((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = async (id) => {
    const updatedSlip = editedSlips[id];
    if (!updatedSlip) {
      alert("No changes made to update.");
      return;
    }

    if (window.confirm("Are you sure you want to update this salary slip?")) {
      try {
        const response = await updateSalary(id, updatedSlip);
        if (response.success) {
          setSalarySlips((prev) =>
            prev.map((slip) => (slip.id === id ? { ...slip, ...updatedSlip } : slip))
          );
          setEditedSlips((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
          alert("Salary slip updated successfully.");
        } else {
          alert(response.message || "Failed to update salary slip.");
        }
      } catch (error) {
        console.error("Error updating salary slip:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this salary slip?")) {
      try {
        const response = await deleteSalary(id);
        if (response.success) {
          setSalarySlips((prev) => prev.filter((slip) => slip.id !== id));
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
                  <TableCell>
                    <TextField
                      value={
                        editedSlips[slip.id]?.month ?? slip.month
                      }
                      onChange={(e) =>
                        handleInputChange(slip.id, "month", e.target.value)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedSlips[slip.id]?.year ?? slip.year
                      }
                      onChange={(e) =>
                        handleInputChange(slip.id, "year", e.target.value)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedSlips[slip.id]?.basicSalary ?? slip.basicSalary
                      }
                      onChange={(e) =>
                        handleInputChange(
                          slip.id,
                          "basicSalary",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedSlips[slip.id]?.deductions ?? slip.deductions
                      }
                      onChange={(e) =>
                        handleInputChange(slip.id, "deductions", e.target.value)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={
                        editedSlips[slip.id]?.netSalary ?? slip.netSalary
                      }
                      onChange={(e) =>
                        handleInputChange(slip.id, "netSalary", e.target.value)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdate(slip.id)}
                      style={{ marginRight: "10px" }}
                    >
                      Update
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

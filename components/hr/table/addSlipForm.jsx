import React from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "../box/box";
import { addSalary } from "../../../services/salaryServices";

const AddSlipForm = ({ user, onClose }) => {
  const formik = useFormik({
    initialValues: {
      basicSalary: "",
      deductions: "",
      netSalary: "",
      month: "",
      year: "",
      userId: user?.id || "",
    },
    validationSchema: Yup.object({
      basicSalary: Yup.number()
        .required("Basic Salary is required")
        .positive("Must be positive"),
      deductions: Yup.number()
        .min(0, "Deductions cannot be negative"),
      netSalary: Yup.number()
        .required("Net Salary is required")
        .positive("Must be positive"),
      month: Yup.string().required("Month is required"),
      year: Yup.number()
        .required("Year is required")
        .min(2000, "Year must be after 2000")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
      userId: Yup.string().required("User ID is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await addSalary(values);
        if (
          response.status === 201 ||
          response.data.message === "Salary slip created successfully"
        ) {
          alert("Salary added successfully!");
        }
        onClose();
      } catch (error) {
        console.error("Error adding salary slip:", error);
        alert("Failed to add salary slip. Please try again.");
      }
    },
  });

  return (
    <Box onClose={onClose}>
      <h2>Add Salary Slip for {user?.name}</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Basic Salary"
          name="basicSalary"
          value={formik.values.basicSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.basicSalary && Boolean(formik.errors.basicSalary)}
          helperText={formik.touched.basicSalary && formik.errors.basicSalary}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Deductions"
          name="deductions"
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
          value={formik.values.netSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.netSalary && Boolean(formik.errors.netSalary)}
          helperText={formik.touched.netSalary && formik.errors.netSalary}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
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
            <p style={{ color: "red", fontSize: "0.8em" }}>{formik.errors.month}</p>
          )}
        </FormControl>
        <TextField
          label="Year"
          name="year"
          value={formik.values.year}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.year && Boolean(formik.errors.year)}
          helperText={formik.touched.year && formik.errors.year}
          fullWidth
          margin="normal"
        />
        <div
        style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}
        >
        <div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
            >
            Add Salary Slip
            </Button>

            <Button
              variant="contained"
              color="primary"
            >
             View Slip
            </Button>
        </div>

        {/* Right side button */}
        <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onClose}
        >
            Cancel
        </Button>
        </div>

      </form>
    </Box>
  );
};

export default AddSlipForm;

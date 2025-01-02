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
import html2pdf from "html2pdf.js";
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
      deductions: Yup.number().min(0, "Deductions cannot be negative"),
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

  // Generate and display the PDF
  const handleViewSlip = () => {
    const slipTemplate = `
  <div style="padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9; color: #000; width: 100%; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="text-align: center; margin-bottom: 20px; color: #333;">Salary Slip</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #fff; border-radius: 8px; overflow: hidden;">
      <tbody>
        <tr style="background-color: #f1f1f1;">
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Employee Name</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${user?.name || "N/A"}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Basic Salary</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${formik.values.basicSalary || "N/A"}</td>
        </tr>
        <tr style="background-color: #f1f1f1;">
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Deductions</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${formik.values.deductions || "N/A"}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Net Salary</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${formik.values.netSalary || "N/A"}</td>
        </tr>
        <tr style="background-color: #f1f1f1;">
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Month</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${formik.values.month || "N/A"}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ccc; padding: 10px; font-weight: bold;">Year</td>
          <td style="border: 1px solid #ccc; padding: 10px;">${formik.values.year || "N/A"}</td>
        </tr>
      </tbody>
    </table>
    <p style="text-align: center; font-size: 14px; color: #666;">This is a system-generated slip.</p>
  </div>
    `;


    const options = {
      margin: 1,
      filename: "Salary_Slip.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Generate and open the PDF in a new tab
    html2pdf().set(options).from(slipTemplate).outputPdf("dataurlnewwindow");
  };

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
            <MenuItem value="April">April</MenuItem>
            <MenuItem value="May">May</MenuItem>
            <MenuItem value="June">June</MenuItem>
            <MenuItem value="July">July</MenuItem>
            <MenuItem value="August">August</MenuItem>
            <MenuItem value="September">September</MenuItem>
            <MenuItem value="October">October</MenuItem>
            <MenuItem value="November">November</MenuItem>
            <MenuItem value="December">December</MenuItem>
          </Select>
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
            onClick={handleViewSlip}
          >
            View Slip
          </Button>
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

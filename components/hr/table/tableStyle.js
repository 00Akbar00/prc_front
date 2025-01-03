export const styles = {
    tableContainer: {
      margin: "20px",
      overflowX: "auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "'Arial', sans-serif",
      borderRadius: "8px",
      overflow: "hidden",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "12px 15px",
      textAlign: "left",
      fontSize: "16px",
      borderBottom: "2px solid #ddd",
    },
    tableHeaderCell: {
      
      padding: "12px 15px",
      textAlign: "left",
      fontWeight: "bold",
      color: "#fff",
    },
    tableCell: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      wordBreak: "break-word",
      maxWidth: "300px",
      backgroundColor: "#f9f9f9",
      color:"black"
    },
    tableRow: {
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    tableRowHover: {
      backgroundColor: "#f1f1f1",
    },
    actionButton: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    actionButtonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    tableTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
      marginLeft:"50px",
      marginTop:"10px"
    },
    logoutButtonContainer: {
      position: "fixed", // or "absolute" depending on your needs
      top: "8.5px",       // Adjust this value as needed
      right: "40px",     // Align it to the right
      zIndex: 1000,      // Make sure it's on top of other elements
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "#dc3545", // Red color for the logout button
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    logoutButtonHover: {
      backgroundColor: "#c82333",
      transform: "scale(1.05)",
    },
    
};
  
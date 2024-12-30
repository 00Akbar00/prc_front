export const styles = {
    mainBox:{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        maxWidth: '400px',
        width: '100%',
        padding: '30px',
        backgroundColor: '#eaf6ff', // Light blue background
        border: '1px solid #b3d9ff', // Subtle border for definition
        borderRadius: '12px', // Rounded corners for a modern look
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for a floating effect
        color: '#003366', // Dark blue text color for contrast
        overflow: 'hidden', // Prevent content overflow
    },
    boxStyles: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '450px',
      padding: '40px',
      backgroundColor: '#2E2E2E', // Soft off-white background for a more elegant look
      border: '1px solid #d1d1d1', // Subtle border for sophistication
      borderRadius: '16px', // Slightly more rounded corners for a refined appearance
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)', // Subtle shadow for a floating effect
      color: '#4a4a4a', // Slightly muted dark gray for text
      zIndex: '1000',
      animation: 'fadeIn 0.5s ease-out', // Smooth appearance animation
      overflow: 'hidden',
      backdropFilter: 'blur(10px)', // Add subtle blur for a frosted glass effect
    },
  
    closeButtonStyles: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'transparent',
      border: 'none',
      fontSize: '20px',
      color: '#7d7d7d', // Slightly muted gray for elegance
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
  
    closeButtonHover: {
      color: '#c0392b', // Rich red on hover for visibility
    },
  
    // Optional: Animation for box appearance
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
  
    boxHeader: {
      fontSize: '24px', // Slightly larger header text for prominence
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#2c3e50', // Rich, dark gray-blue for a polished header
    },
  
    boxContent: {
      fontSize: '18px', // Slightly larger content text for readability
      color: '#4a4a4a', // Elegant dark gray for content
      lineHeight: '1.8', // Enhanced line spacing for readability
      textAlign: 'justify', // Justify text for a formal look
    },
  };
  
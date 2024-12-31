export const styles = {
  mainBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
    maxWidth: '1000px',
    width: '90%',
    padding: '40px',
    background: 'linear-gradient(145deg, #fdfcf6, #f5f5f0)', // Soft off-white with subtle yellow tones
    border: '1px solid #e6e2d8', // Warm, light border to complement the background
    borderRadius: '20px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
    color: '#333333', // Darker gray for better contrast and readability
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Clean and modern font
  },
  
  boxStyles: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '950px',
    padding: '40px',
    backgroundColor: '#f9f7f1', // Warm light gray with a creamy touch
    border: '1px solid #e0dcd4', // Subtle border with a warm gray tone
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), inset 0 1px 3px rgba(255, 255, 255, 0.25)', // Soft, elegant shadows
    color: '#333333', // Darker text for better readability
    zIndex: '1000',
    animation: 'fadeIn 0.5s ease-out',
    overflow: 'hidden',
    backdropFilter: 'blur(8px)', // Subtle blur effect for a polished look
    transition: 'all 0.3s ease', // Smooth transitions for interactions
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Consistent font family
  },
  
  closeButtonStyles: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: '#7d7d7d',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  
  closeButtonHover: {
    color: '#c0392b',
  },
  
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  
  boxHeader: {
    fontSize: '26px', // Slightly larger header for emphasis
    fontWeight: '600', // Semi-bold weight for better contrast
    marginBottom: '20px',
    color: '#2c3e50', // Darker color for the header
    textAlign: 'center', // Centering the header text
  },
  
  boxContent: {
    fontSize: '18px', // Increased font size for better readability
    color: '#333333', // Darker color for better contrast
    lineHeight: '1.6', // Slightly increased line height for better readability
    textAlign: 'left', // Align text to the left for a clean flow
    marginTop: '10px', // Add some space at the top of the content
  },
};

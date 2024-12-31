import React, { useState } from 'react';
import { styles } from './boxStyle'; // Import the external styles

const Box = ({ children, onClose, className, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={className} style={styles.boxStyles} {...props}>
      <button
        style={isHovered ? { ...styles.closeButtonStyles, ...styles.closeButtonHover } : styles.closeButtonStyles}
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        &times;
      </button>
      {children}
    </div>
  );
};

export default Box;

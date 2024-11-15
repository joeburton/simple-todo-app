import React from 'react';

import styles from './CustomButton.module.css';

interface CustomButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, buttonText }) => {
  return (
    <button className={styles.customButton} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default CustomButton;

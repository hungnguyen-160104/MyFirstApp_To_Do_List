import React from "react";
import styles from "./ActionButtons.module.css"; // Import CSS module
import { Box } from "@mui/material";
import { Add, Remove, DragIndicator } from "@mui/icons-material";

const ActionButtons = ({ onAdd, onRemove }) => {
  return (
    <Box className={styles["action-buttons"]}>
      <button
        className={styles["icon-button"]}
        onClick={onAdd}
        aria-label="Add"
      >
        <Add />
      </button>
      <button
        className={styles["icon-button"]}
        onClick={onRemove}
        aria-label="Remove"
      >
        <Remove />
      </button>    
    </Box>
  );
};

export default ActionButtons;

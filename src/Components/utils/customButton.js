import React from "react";
import { Button } from "@mui/material";
import colors from "../constant/colors";

const CustomButton = ({ children, onClick, onload, type = "button", ...props }) => {
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth
      size="small"
      onClick={onClick}
      disabled={onload}
      sx={{
        mt: 4,
        backgroundColor: colors.primary,
        borderRadius: 1,
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "none",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        "&:hover": {
          backgroundColor: colors.primaryDark,
          transform: "translateY(-2px)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

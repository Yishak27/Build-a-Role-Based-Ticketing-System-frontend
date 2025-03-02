import React from "react";
import { TextField } from "@mui/material";
import colors from "../constant/colors";

const CustomTextField = ({
  label,
  value,
  onChange,
  type = "text",
  required,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required={required ? true : false}
      fullWidth
      margin="normal"
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primaryDark,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primary,
        },
        "& .MuiInputLabel-root": {
          color: colors.gray,
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;

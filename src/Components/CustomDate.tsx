import React from "react";
import { TextField, Box } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface CustomDateFieldProps {
  label: string;
  value: string | null;
  name: string;
  onChange: (date: Date | null) => void;
}

const CustomDateField: React.FC<CustomDateFieldProps> = ({
  label,
  value,
  name,
  onChange,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={onChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDateField;

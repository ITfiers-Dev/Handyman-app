import React from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  Box,
  Card,
  SelectChangeEvent,
} from "@mui/material";

interface CustomMultiSelectProps {
  label: string;
  options: string[];
  value: string[]; // Now it's an array of strings
  name: string;
  onChange: (name: string, value: string[]) => void; // Pass name & array
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  value,
  name,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    onChange(event); 
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select
            multiple
            value={value} // Ensure value is an array
            onChange={handleChange}
            name={name}
            renderValue={(selected) => selected.join(", ")}
            sx={{ marginTop: 1 }}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={value.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card>
    </Box>
  );
};

export default CustomMultiSelect;

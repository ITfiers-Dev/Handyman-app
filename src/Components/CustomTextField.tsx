import React from 'react';
import { TextField, Box, Card, Typography } from '@mui/material';

interface CustomTextFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
  variant?: 'outlined' | 'filled' | 'standard';
  helperText?: string;
  fullWidth?: boolean;
  type?: 'text' | 'number' 
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  name,
  onChange,
  multiline = false,
  rows = 1,
  variant = 'outlined',
  helperText = '',
  fullWidth = true,
  type,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fafafa',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 400 }}>
          {label}
        </Typography>

        <TextField
          fullWidth={fullWidth}
          value={value}
          name={name}
          onChange={onChange}
          label={label}
          multiline={multiline}
          rows={rows}
          type={type}
          variant={variant}
          helperText={helperText}
          sx={{ marginTop: 1 }}
        />
        
      </Card>
    </Box>
  );
};

export default CustomTextField;

import React from 'react';
import { TextField, Box, Card, Typography } from '@mui/material';

interface TimePickerProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  fullWidth?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  name,
  onChange,
  helperText = '',
  fullWidth = true,
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
          type="time"
          variant="outlined"
          helperText={helperText}
          sx={{ marginTop: 1 }}
          InputLabelProps={{ shrink: true }}
        />
      </Card>
    </Box>
  );
};

export default TimePicker;

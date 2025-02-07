import React from 'react';
import { Card, FormControlLabel, Radio, RadioGroup, Typography, Box } from '@mui/material';

interface CustomRadioProps {
  title: string;
  options: string[];
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({ title, options, value, name, onChange }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
        }}
      >
        <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 400 }}>
          {title}
        </Typography>

        <RadioGroup row value={value} onChange={onChange}>
          {options.map((option) => (
            <FormControlLabel
              key={option}
              control={<Radio color="primary" />}
              label={option}
              name={name}
              value={option}
              sx={{ marginRight: 3 }}
            />
          ))}
        </RadioGroup>
      </Card>
    </Box>
  );
};

export default CustomRadio;


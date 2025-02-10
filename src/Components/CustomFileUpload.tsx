import React, { useState } from "react";
import { Button, Typography, Box, Input, Card } from "@mui/material";

interface CustomFileUploadProps {
  label: string;
  value: File | null;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  label,
  name,
  onChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFileName(file ? file.name : "");
    if (file) {
      onChange(event);
    }
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
        <Typography
          variant="h6"
          gutterBottom
          align="left"
          sx={{ fontWeight: 400 }}
        >
          {label}
        </Typography>

        <Input
          type="file"
          name={name}
          onChange={handleFileChange}
          sx={{ display: "none" }}
          id={`upload-button-${name}`}
        />

        <label htmlFor={`upload-button-${name}`}>
          <Button
            variant="contained"
            component="span"
            
            size="small"
            sx={{
              marginTop: 3,
              borderRadius: 3,
              bgcolor: "#2196F3", 
              color: "white", 
              "&:hover": { bgcolor: "#1976D2" }, 
            }}
          >
            Upload Photo
          </Button>
        </label>

        {fileName && (
          <Box sx={{ marginTop: 1, border: "1px solid #ddd", padding: 1,bgcolor: "#e1f2f2", 
            color: "black", borderRadius: 3,
            "&:hover": { bgcolor: "#21CBF3" }, 
            fontSize: "8px",
           }}>
            <Typography variant="body2">Selected file: {fileName}</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CustomFileUpload;

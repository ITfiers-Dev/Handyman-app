
import { useState } from "react";
import { Autocomplete, TextField, Box, Card } from "@mui/material";
import jsonData from "../data.json"; // Ensure this path is correct

// Extract city data from JSON
const cities = jsonData.data.cities.map((city) => ({
  id: city.id,
  name: city.name,
  geofences: city.geofences.map((geo) => ({
    id: geo.id,
    area_name: geo.area_name,
    lat: geo.lat,
    lng: geo.lng,
    type: geo.type,
    cityId:geo.cityId,
    createdAt:geo.createdAt,
    geofence_id:geo.geofence_id,
    tp_code:geo.tp_code,
    tp_type:geo.tp_type,
    rest_brId:geo.rest_brId,
    


  })),
}));

export default function AreaTextField({ formData, setFormData }: any) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: 300 }}>
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          gap: 4,
        }}
      >
        {/* City Selection */}
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option.name}
          value={selectedCity}
          onChange={(_, newValue) => {
            setSelectedCity(newValue);
            setSelectedArea(null); // Reset area when city changes
            setFormData({
              ...formData,
              city: newValue ? newValue.name : null, // Store city name only
              area: null, // Reset area
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select City"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
        />

        {/* Area Selection (Conditional) */}
        <Autocomplete
          options={selectedCity ? selectedCity?.geofences : []}
          getOptionLabel={(option) => option.area_name}
          value={selectedArea}
          onChange={(_, newValue) => {
            setSelectedArea(newValue);
            setFormData({
              ...formData,
              area: newValue ? newValue?.area_name : null, // Store area name only
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Area"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
          disabled={!selectedCity} // Disable if no city is selected
        />
      </Card>
    </Box>
  );
}

import { useState } from "react";
import { Autocomplete, TextField, Box, Card, Chip } from "@mui/material";
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

export default function MultiSelectArea({ formData, setFormData }: any) {
  const [selectedCities, setSelectedCities] = useState<any[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);
  const availableAreas = selectedCities
    .flatMap((city) => city.geofences)
    .filter((area, index, self) => index === self.findIndex((a) => a.id === area.id));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, width: 400 }}>
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
        {/* Multi-Select City Dropdown */}
        <Autocomplete
          multiple
          options={cities}
          getOptionLabel={(option) => option.name}
          value={selectedCities}
          onChange={(_, newValue) => {
            setSelectedCities(newValue);
            setSelectedAreas([]); // Reset areas when cities change
            setFormData((prev: any) => ({
              ...prev,
              servingCity: newValue.map((city) => city.name), // Store selected cities
              servingAreas: [], // Reset areas
            }));
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={option.id} label={option.name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Serving Cities" variant="outlined" fullWidth />
          )}
        />

        {/* Multi-Select Area Dropdown */}
        <Autocomplete
          multiple
          options={availableAreas}
          getOptionLabel={(option) => option.area_name}
          value={selectedAreas}
          onChange={(_, newValue) => {
            setSelectedAreas(newValue);
            setFormData((prev: any) => ({
              ...prev,
              servingAreas: newValue.map((area) => area.area_name), // Store selected areas
            }));
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={option.id} label={option.area_name} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Serving Areas"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
          )}
          disabled={selectedCities.length === 0}
        />
      </Card>
    </Box>
  );
}

import { useState } from "react";
import { Autocomplete, TextField, Box, Card } from "@mui/material";
import jsonData from "../data.json"; // Ensure this path is correct

// Define the type for geofences
type Geofence = {
  id: number;
  area_name: string;
  lat: string;
  lng: string;
  type: number;
  cityId: number;
  createdAt: string;
  geofence_id: number;
  tp_code: null | string;
  tp_type: null | string;
  rest_brId: number;
};

// Define the type for city
type City = {
  id: number;
  name: string;
  geofences: Geofence[];
};

// Extract city data from JSON
const cities: City[] = jsonData.data.cities.map((city: any) => ({
  id: city.id,
  name: city.name,
  geofences: city.geofences.map((geo: any) => ({
    id: geo.id,
    area_name: geo.area_name,
    lat: geo.lat,
    lng: geo.lng,
    type: geo.type,
    cityId: geo.cityId,
    createdAt: geo.createdAt,
    geofence_id: geo.geofence_id,
    tp_code: geo.tp_code,
    tp_type: geo.tp_type,
    rest_brId: geo.rest_brId,
  })),
}));

console.log("cities", cities);

export default function AreaTextField({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: (data: any) => void;
}) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedArea, setSelectedArea] = useState<Geofence | null>(null);

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
          options={selectedCity ? selectedCity.geofences : []}
          getOptionLabel={(option) => option.area_name}
          value={selectedArea}
          onChange={(_, newValue) => {
            setSelectedArea(newValue);
            setFormData({
              ...formData,
              area: newValue ? newValue.area_name : null, // Store area name only
            });
          }}
          filterOptions={(options, { inputValue }) => {
            const inputLower = inputValue.toLowerCase();
            return options
              .filter((option) =>
                option.area_name.toLowerCase().includes(inputLower)
              )
              .sort((a, b) => {
                const aStartsWith = a.area_name.toLowerCase().startsWith(inputLower);
                const bStartsWith = b.area_name.toLowerCase().startsWith(inputLower);

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return 0;
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

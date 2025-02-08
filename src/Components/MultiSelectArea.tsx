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
    cityId: geo.cityId,
    createdAt: geo.createdAt,
    geofence_id: geo.geofence_id,
    tp_code: geo.tp_code,
    tp_type: geo.tp_type,
    rest_brId: geo.rest_brId,
  })),
}));

export default function MultiSelectArea({ setFormData }: any) {
  const [selectedCities, setSelectedCities] = useState<any[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]);

  const availableAreas = selectedCities
    .flatMap((city) => city.geofences)
    .filter((area, index, self) => index === self.findIndex((a) => a.id === area.id));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: { xs: "100%", sm: 400 } }}>
      <Card
        sx={{
          padding: { xs: 2, sm: 3 },
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
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
            setSelectedAreas([]);
            setFormData((prev: any) => ({
              ...prev,
              servingCity: newValue.map((city) => city.name),
              servingAreas: [],
            }));
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
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
              servingAreas: newValue.map((area) => area.area_name),
            }));
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip  label={option.area_name} {...getTagProps({ index })} />
            ))
          }
          filterOptions={(options, { inputValue }) => {
            const inputLower = inputValue.toLowerCase();
            return options
              .filter((option) => option?.area_name?.toLowerCase().includes(inputLower))
              .sort((a, b) => {
                const aStartsWith = a?.area_name?.toLowerCase().startsWith(inputLower);
                const bStartsWith = b?.area_name?.toLowerCase().startsWith(inputLower);

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return 0;
              });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Serving Areas" variant="outlined" fullWidth sx={{ mt: 2, mb: 2 }} />
          )}
          disabled={selectedCities.length === 0}
        />
      </Card>
    </Box>
  );
}

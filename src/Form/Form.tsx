// import { Grid, Paper, Typography, Radio, RadioGroup, FormControl, FormControlLabel, TextField, Button } from "@mui/material";
import {
  Box,
  Button,
  Card,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomRadio from "../Components/CustomRadio";
import CustomTextField from "../Components/CustomTextField";
import CustomFileUpload from "../Components/CustomFileUpload";
import CustomMultiSelect from "../Components/CustomMultiSelect";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { updateDBPost } from "../Api/backend";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TimePicker from "../Components/TimePicker";
import dayjs from "dayjs";
import AreaTextField from "../Components/AreaTextField";
import MultiSelectArea from "../Components/MultiSelectArea";

// import dayjs from "dayjs";

const HandymanRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    usedPlatforms: "",
    platformName: "",
    comfortableWithApps: "",
    customerChallenges: "",
    interestedInPlumbingServices: "",
    haveSmartPhone: "",
    fullName: "",
    dateOfBirth: "",
    whatsappNumber: "",
    otherContactNumber: "",
    completeAddress: "",
    area: "",
    city: "",
    photo: null,
    idCardNumber: "",
    idCardImageFront: null,
    idCardImageBack: null,
    yearsOfExperience: "",
    expertise: [],
    specialization: [],
    servingCity: [],
    servingAreas: [],
    workingDays: [],
    workingHours: "",
    startTime: "",
    endTime: "",
    easyPaisaNumber: "",
    jazzCashNumber: "",
    bankName: "",
    bankAccountNumber: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => {
    const target = event.target as
      | HTMLInputElement
      | { name: string; value: unknown };
    const { name, value, files } = target as HTMLInputElement;
    if (["photo", "idCardImageFront", "idCardImageBack"].includes(name)) {
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData((prev) => ({ ...prev, [name]: base64String }));
        };

        reader.readAsDataURL(file); 
      }
      return;
    }
    if (Array.isArray(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("formData", formData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(""); // Reset message before new request
  
    try {
      const res = await updateDBPost(formData);
      
      setMessage(res?.message || "Successfully updated"); // Use optional chaining
      console.log(res);
    } catch (error: any) {
      console.error("An error occurred:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); 
    }
  };
  

  const handleDateChange = (date: any, name: string) => {
    if (date) {
      const formattedDate = dayjs(date).format("DD/MM/YYYY");
      console.log(formattedDate); // ✅ Store in standard format
      setFormData((prev) => ({ ...prev, [name]: formattedDate })); // ✅ Update state
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
        <Paper
          elevation={5}
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" }, // Responsive width
            maxWidth: 600, // Limit maximum width for large screens
            padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            margin: "auto", // Center the Paper
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <CustomRadio
              title="Have you used similar platforms before?"
              options={["yes", "No"]}
              value={formData.usedPlatforms}
              name="usedPlatforms"
              onChange={handleChange}
            />

            {/* Conditional rendering of the text field */}
            {formData.usedPlatforms === "yes" && (
              <CustomTextField
                label="Platform Name"
                value={formData.platformName}
                name="platformName"
                onChange={handleChange}
              />
            )}

            <CustomRadio
              title="Are you comfortable using mobile apps for bookings and payments?"
              options={["yes", "No"]}
              value={formData.comfortableWithApps}
              name="comfortableWithApps"
              onChange={handleChange}
            />
            <CustomTextField
              label="Biggest challenges faced with customers?"
              value={formData.customerChallenges}
              name="customerChallenges"
              onChange={handleChange}
              multiline
              rows={4}
            />
            <CustomRadio
              title="Are you interested in joining an online platform for plumbing services?"
              options={["yes", "No"]}
              value={formData.interestedInPlumbingServices}
              name="interestedInPlumbingServices"
              onChange={handleChange}
            />
            <CustomRadio
              title="Do you have a smartphone and internet access?"
              options={["yes", "No"]}
              value={formData.haveSmartPhone}
              name="haveSmartPhone"
              onChange={handleChange}
            />

            {formData.interestedInPlumbingServices === "yes" &&
              formData.haveSmartPhone === "yes" && (
                <>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    sx={{ fontWeight: 600 }}
                  >
                    Personal Information
                  </Typography>
                  <CustomTextField
                    label="Full Name"
                    value={formData.fullName}
                    name="fullName"
                    onChange={handleChange}
                  />
                  <Card
                    sx={{
                      padding: 2,
                      boxShadow: 3,
                      borderRadius: 2,
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #ddd",
                      mb: 2,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        value={
                          formData.dateOfBirth
                            ? dayjs(formData.dateOfBirth)
                            : null
                        }
                        onChange={(date: any) =>
                          handleDateChange(date, "dateOfBirth")
                        }
                        format="DD/MM/YYYY"
                        sx={{ width: "100%" }}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Card>
                  <CustomTextField
                    label="WhatsApp Number"
                    value={formData.whatsappNumber}
                    name="whatsappNumber"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomTextField
                    label="Other Contact Number"
                    value={formData.otherContactNumber}
                    name="otherContactNumber"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomTextField
                    label="Complete Address"
                    value={formData.completeAddress}
                    name="completeAddress"
                    onChange={handleChange}
                    type="text"
                  />

                  <Box mb={2}>
                    <AreaTextField
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </Box>
                  <CustomFileUpload
                    label="Photo"
                    name="photo"
                    onChange={handleChange}
                    value={formData.photo}
                  />
                  <CustomTextField
                    label="ID Card Number"
                    value={formData.idCardNumber}
                    name="idCardNumber"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomFileUpload
                    label="ID Card Image Front"
                    name="idCardImageFront"
                    onChange={handleChange}
                    value={formData.idCardImageFront}
                  />
                  <CustomFileUpload
                    label="ID Card Image Back"
                    name="idCardImageBack"
                    onChange={handleChange}
                    value={formData.idCardImageBack}
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    sx={{ fontWeight: 600 }}
                  >
                    Professional Details
                  </Typography>
                  <CustomTextField
                    label="Years of Experience"
                    value={formData.yearsOfExperience}
                    name="yearsOfExperience"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomMultiSelect
                    label="Expertise"
                    options={[
                      "Plumbing",
                      "Electrical",
                      "Painting",
                      "Cleaning",
                      "Residential Plumbing",
                      "Commercial Plumbing",
                      "Emergency Plumbing",
                      "Pipe Repair & Replacement",
                      "Water Heater Installation & Repair",
                      "Sewer & Drain Cleaning",
                      "Leak Detection & Repair",
                      "Gas Line Services",
                      "Bathroom & Kitchen Plumbing",
                      "Other",
                    ]}
                    value={formData.expertise}
                    name="expertise"
                    onChange={handleChange}
                  />
                  <CustomMultiSelect
                    label="Specialties"
                    options={[
                      "Plumbing",
                      "Electrical",
                      "Faucet & Sink Installation",
                      "Toilet Installation & Repair",
                      "Water Leak Repairs",
                      "Shower & Bathtub Plumbing",
                      "Drain Unclogging",
                      "Sump Pump Installation",
                      "Septic Tank Repair & Maintenance",
                      "Water Filtration System Installation",
                      "Radiant Floor Heating",
                      "Boiler Installation & Repair",
                      "Gas Pipe Installation & Maintenance",
                      "Hydro Jetting",
                      "Painting",
                      "Cleaning",
                      "Other",
                    ]}
                    value={formData.specialization}
                    name="specialization"
                    onChange={handleChange}
                  />
                  {/* <CustomMultiSelect
              label="Serving City"
              options={["Rwalpindi", "Islambad"]}
              value={formData.servingCity}
              name="servingCity"
              onChange={handleChange}
            />
            <CustomMultiSelect
              label="Serving Areas"
              options={["No area"]}
              value={formData.servingAreas}
              name="servingAreas"
              onChange={handleChange}
            /> */}
                  <Box mb={2} mt={1}>
                    <MultiSelectArea
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    sx={{ fontWeight: 600 }}
                  >
                    Availability & Pricing
                  </Typography>
                  <CustomMultiSelect
                    label="Working Days"
                    options={[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ]}
                    value={formData.workingDays}
                    name="workingDays"
                    onChange={handleChange}
                  />
                  <CustomTextField
                    label="Working Hours"
                    value={formData.workingHours}
                    name="workingHours"
                    onChange={handleChange}
                    type="text"
                  />
                  <TimePicker
                    label=" Working Start Time"
                    value={formData.startTime}
                    name="startTime"
                    onChange={handleChange}
                    helperText="Pick a starting time"
                  />
                  <TimePicker
                    label=" Working End Time"
                    value={formData.endTime}
                    name="endTime"
                    onChange={handleChange}
                    helperText="Pick a starting time"
                  />
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="left"
                    sx={{ fontWeight: 600 }}
                  >
                    Bank & Payment Details
                  </Typography>
                  <CustomTextField
                    label="Easy Paisa Number"
                    value={formData.easyPaisaNumber}
                    name="easyPaisaNumber"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomTextField
                    label="Jazz Cash Number"
                    value={formData.jazzCashNumber}
                    name="jazzCashNumber"
                    onChange={handleChange}
                    type="number"
                  />
                  <CustomTextField
                    label="Bank Name"
                    value={formData.bankName}
                    name="bankName"
                    onChange={handleChange}
                    type="text"
                  />
                  <CustomTextField
                    label="Bank Account Number"
                    value={formData.bankAccountNumber}
                    name="bankAccountNumber"
                    onChange={handleChange}
                    type="number"
                  />
                </>
              )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Submit Button */}
              <Button
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  borderRadius: "18px",
                  "&:hover": {
                    backgroundColor: "#21CBF3",
                  },
                }}
                type="submit"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>

              {/* Message Display */}
              {message && (
                <Card
                  elevation={5}
                  sx={{
                    padding: "6px 12px",
                    boxShadow: 3,
                    borderRadius: 4,
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                    minHeight: "30px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.875rem",
                  }}
                >
                  {message}
                </Card>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default HandymanRegistration;

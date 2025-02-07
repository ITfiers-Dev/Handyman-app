// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the interface for the form data
// interface FormData {
//   usedPlatforms: string;
//   platformName: string;
//   comfortableWithApps: string;
//   customerChallenges: string;
//   interestedInPlumbingServices: string;
//   haveSmartPhone: string;
//   fullName: string;
//   dateOfBirth: string;
//   whatsappNumber: string;
//   otherContactNumber: string;
//   completeAddress: string;
//   area: string;
//   city: "Rawalpindi" | "Islamabad";
//   photo: File | null;
//   idCardNumber: string;
//   idCardImageFront: File | null;
//   idCardImageBack: File | null;
//   yearsOfExperience: string;
//   expertise: "Plumber" | "Electrician" | "Carpenter" | "Painter";
//   specialization: string[];
//   servingCity: string[];
//   servingAreas: string[];
//   workingDays: string[];
//   workingHoursStart: string;
//   workingHoursEnd: string;
//   easyPaisaNumber: string;
//   jazzCashNumber: string;
//   bankName: string;
//   bankAccountNumber: string;
// }

// // Default state
// const defaultFormData: FormData = {
//   usedPlatforms: "",
//   platformName: "",
//   comfortableWithApps: "",
//   customerChallenges: "",
//   interestedInPlumbingServices: "",
//   haveSmartPhone: "",
//   fullName: "",
//   dateOfBirth: "",
//   whatsappNumber: "",
//   otherContactNumber: "",
//   completeAddress: "",
//   area: "",
//   city: "Rawalpindi",
//   photo: null,
//   idCardNumber: "",
//   idCardImageFront: null,
//   idCardImageBack: null,
//   yearsOfExperience: "",
//   expertise: "Plumber",
//   specialization: [],
//   servingCity: [],
//   servingAreas: [],
//   workingDays: [],
//   workingHoursStart: "",
//   workingHoursEnd: "",
//   easyPaisaNumber: "",
//   jazzCashNumber: "",
//   bankName: "",
//   bankAccountNumber: "",
// };

// // Create Context
// // const FormContext = createContext<{
// //   formData: FormData;
// //   setFormData: React.Dispatch<React.SetStateAction<FormData>>;
// // } | null>(null);

// // Create a provider to wrap the root component
// const FormContext = createContext<{
//     formData: FormData;
//     setFormData: React.Dispatch<React.SetStateAction<FormData>>;
//   } | null>(null);
  
//   // FormProvider component to provide context to children
//   export const FormProvider: React.FC<{ children: ReactNode }> = ({ }) => {
//     const [formData, setFormData] = useState<FormData>(defaultFormData);
    
//     return (
//       <FormContext.Provider value={{ formData, setFormData }}>
//         {children}
//       </FormContext.Provider>
//     );
//   };

// // Custom hook to access the form data
// export const useFormData = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error("useFormData must be used within a FormProvider");
//   }
//   return context;
// };

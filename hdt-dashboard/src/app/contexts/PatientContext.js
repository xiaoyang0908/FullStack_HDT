// PatientContext.js



// could pass the value directly by using router
// maybe move this provider to therapist layout?

import React, { createContext, useContext, useState } from 'react';

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
    const [currentPatient, setCurrentPatient] = useState(null);

    // Function to update the current patient in the context
    const updateCurrentPatient = (patientData) => {
        setCurrentPatient(patientData);
    };

    // Function to save updated patient data to the backend
    const savePatientData = async (patientId, updatedData) => {

    };

    return (
        <PatientContext.Provider value={{ currentPatient, updateCurrentPatient, savePatientData }}>
            {children}
        </PatientContext.Provider>
    );
};

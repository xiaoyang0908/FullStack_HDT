'use client'
import { useState, useEffect } from "react";

export default function TherapistPatientsDetails(){

    useEffect(() => {   // Prevents scrolling on page
        document.body.style.overflow = 'hidden';
    }, []);

    return (
        <div>
            Patients
        </div>
    )
}
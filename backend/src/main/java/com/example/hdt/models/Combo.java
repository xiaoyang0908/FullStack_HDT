package com.example.hdt.models;

public class Combo {
    private Patient carePatient;
    private Therapist therapist;

    public Patient getCarePatient() {
        return carePatient;
    }

    public void setCarePatient(Patient carePatient) {
        this.carePatient = carePatient;
    }

    public Therapist getTherapist() {
        return therapist;
    }

    public void setTherapist(Therapist therapist) {
        this.therapist = therapist;
    }
}

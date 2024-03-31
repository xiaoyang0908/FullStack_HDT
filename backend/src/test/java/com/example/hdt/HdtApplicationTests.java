package com.example.hdt;

import com.example.hdt.ServiceImpl.PatientImpl;
import com.example.hdt.models.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class HdtApplicationTests {
    @Autowired
    private PatientImpl patientImpl;

    @Test
    void testGetPatient() {
        List<Patient> patientList = patientImpl.getPatientList();
        System.out.println(patientList);

    }

}

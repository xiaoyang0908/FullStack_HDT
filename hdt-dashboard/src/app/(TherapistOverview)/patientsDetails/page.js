'use client'
import { useEffect, useState } from "react";
import ThreeDAvatar from "@/app/components/three";
import {
    Box,
    Grid,
    Paper,
    Avatar as MuiAvatar, // Renamed to avoid confusion with Avatar component
    Button,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Container,
    Card,
    CardContent
} from "@mui/material";
import {
    PaddingTwoTone,
    Male,
    EditIcon
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import PieChart from "@/app/components/pieChart";

export default function TherapistPatientsDetails() {

    const [currentPatient, setCurrentPatient] = useState({});
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const patientData = localStorage.getItem('currentPatient');
        if (patientData) {
            setCurrentPatient(JSON.parse(patientData));
            setLoading(false);
        } else {
            // Handle the case where there's no patient data, perhaps by setting loading to false and managing the empty state
            setLoading(false);
        }
    
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    
    if (loading) {
        return <div>Loading...</div>; // Or some other loading indicator
    }

    function checkPatientData(property) {
        if (currentPatient && currentPatient[property]) {
            if (Array.isArray(currentPatient[property])) {
                return currentPatient[property].join(', ');
            } else {
                return currentPatient[property];
            }
        } else {
            return 'Error Loading';
        }
    }

    const userAvatar = (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100%' }}>
            <ThreeDAvatar modelUrl={checkPatientData('avatar')} />  
        </Grid>
    );

    const personalInfoSection = (
        <Grid>
            <Paper sx={{ p: 2, minHeight: '90vh', maxHeight: '90vh', overflow: 'auto'  }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                            { <MuiAvatar alt="PB" src={checkPatientData('photo')} sx={{ width: 100, height: 100}}/> }
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                            <Typography variant="h5">{ checkPatientData('name') }</Typography>
                        </Box>
                        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 4, pb: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="body1">Birth date</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('birth') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Client's Tel.</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('phone') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Email</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('email') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Contact person</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('caregivers') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Contact Person Tel.</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('caregiversPhone') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Type of Movement impairment</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('impaired') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Dominant arm</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('domiantArm') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Therapy goals</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('') }</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );

    // Exercise Completion section
    const exerciseCompletionChartSection = (
        <Paper sx={{ p: 2, minHeight: '100%'}}>
            <Typography align="center" variant="h6">Exercise Completion Rate</Typography>
            <PieChart />
        </Paper>
    );

    // Tasks Section
    const tasksSection = (
        <Box sx={{ width: '100%', flex: '1 1 auto', overflow: 'hidden' }}>  
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '55vh' }}>
                <Typography textAlign="center" variant="h6" sx={{ paddingBottom: 1 }}>Tasks</Typography>
                <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                            <Grid item xs={12} key={item}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h7" component="div">
                                            Placeholder Title {item}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Placeholder content here...
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );

    return (
        <Container sx={{ paddingTop: '6vh', minWidth: '100vw', maxHeight: '100vh', overflow: 'hidden' }}>
            <Grid container spacing={2}>

                {/* Personal Info Section, assuming it's now smaller let's say md={3} */}
                <Grid item xs={12} md={2.5}>
                    {personalInfoSection}
                </Grid>

                {/* Exercise Completion Chart & Tasks Section */}
                <Grid item xs={12} md={2.5}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            {exerciseCompletionChartSection}
                        </Grid>
                        <Grid item xs={12}>
                            {tasksSection}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4.8}>
                    {userAvatar}
                </Grid>
            </Grid>
        </Container>
    )
}
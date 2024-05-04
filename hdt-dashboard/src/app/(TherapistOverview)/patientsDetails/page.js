'use client'
import { useEffect, useState } from "react";
import ThreeDAvatar from "@/app/components/three";
import { ClickBack } from "@/app/components/clickBack"
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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PieChart from "@/app/components/pieChart";
import { useRouter } from 'next/navigation';

export default function TherapistPatientsDetails() {

    const objModelPath = '/Wheelchair.glb'

    const [currentPatient, setCurrentPatient] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleEditClick = () => {
        try {
            localStorage.setItem('currentPatient', JSON.stringify(currentPatient)); // Save patient data to local storage
            router.push('/createPatientPage');
        } catch (error) {
            console.error("Error navigating with patient data:", error);
        }
    };

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
            <ThreeDAvatar glbModelUrl={checkPatientData('avatar')} />
        </Grid>
    ); // lod=2 is the level of detail, you can adjust this as needed. Values: 0, 1 2.
    

    const personalInfoSection = (
        <Grid>
            <Paper sx={{ p: 2, minHeight: '85vh', maxHeight: '85vh', overflow: 'auto'  }}>
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">Birth date</Typography>
                                <IconButton aria-label="edit" onClick={handleEditClick}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{checkPatientData('birth')}</Typography>
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
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('contact').fullName }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Contact Person Tel.</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('contact').phoneNumber }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Type of Movement impairment</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('impaired') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Dominant arm</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('dominantArm') }</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Therapy goals</Typography>
                            <Typography variant="body2" color="text.secondary">{ checkPatientData('goals') }</Typography>
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
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '51vh' }}>
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

                <Grid item xs={12}>
                    <ClickBack username={checkPatientData('name')} pagename={"Details"} path={"/therapistPage"} />
                </Grid>
                
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
'use client'
import { use, useEffect, useState } from "react";
import ThreeDAvatar from "@/app/components/three";
import { ClickBack } from "@/app/components/clickBack"
import {
    Box,
    Grid,
    Paper,
    Avatar as MuiAvatar, // Renamed to avoid confusion with Avatar component
    Typography,
    Divider,
    Container,
    Button
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PieChart from "@/app/components/pieChart";
import { useRouter } from 'next/navigation';
import TasksComponent from "@/app/components/taskList";
import { reqTaskCategory } from "@/app/api/api";

export default function TherapistPatientsDetails() {

    const objModelPath = '/Wheelchair.glb'

    const [currentPatient, setCurrentPatient] = useState({});
    const [loading, setLoading] = useState(true);
    const[taskCategory,setTaskCategory] = useState({});
    const router = useRouter();

    const editPatientButtonPath = '/createPatientPage';
    const manageTaskButtonPath = '/manageTasks';

    const handleButtonClick = (path) => {
        try {
            localStorage.setItem('currentPatient', JSON.stringify(currentPatient)); // Save patient data to local storage
            router.push(path);
        } catch (error) {
            console.error("Error navigating with patient data:", error);
        }    };


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


        useEffect(() => {
            if (currentPatient.patientID) {
                reqTaskCategory(currentPatient.patientID)
                    .then((res) => {
                        // console.log(res);
                        if (res) {
                            setTaskCategory(res);
                            console.log(res);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }, [currentPatient.patientID]);
    
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
            return 'No data available';
        }
    }


    /*
    useEffect(() => {
        const patientData = localStorage.getItem('currentPatient');
        if (patientData) {
            const loadedPatient = JSON.parse(patientData);
            // Ensure exerciseData is present and in the correct format, if not, use default
            if (!loadedPatient.exerciseData || !loadedPatient.exerciseData.total || !loadedPatient.exerciseData.week) {
                loadedPatient.exerciseData = DEFAULT_EXERCISE_DATA;
            }
            setCurrentPatient(loadedPatient);
            setLoading(false);
        } else {
            setLoading(false);
            // Optionally handle no data found case more explicitly here
        }
    
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);*/


    const DEFAULT_EXERCISE_DATA = {
        'total': [0, 100], // Assuming a default target of 100 minutes total
        'week': [0, 50]    // Assuming a default target of 50 minutes per week
    };
    

    const userAvatar = (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100%',position:"relative"}}>
            <ThreeDAvatar glbModelUrl={checkPatientData('avatar')} />
            <Box sx={{top:"2%", position:"absolute", left:"6%",width:"100%", height:"100%"}}>
                <Typography variant="h4" color={"white"}>Range of Motion(ROM)</Typography>
            </Box>
            <Box sx={{position:"absolute",width:"100%", height:"100%", top:0, left:0}}>
                <img alt="rangeMotion"  src="ROMArrows.png" width={"100%"} height={"100%"} />
            </Box>
            <Box sx={{top:"55%", position:"absolute", left:0,width:"100%", height:"100%", display:"flex", justifyContent:"space-between", p:"10%" }}>
                <Typography variant="h5" color={"white"}>Left: 179</Typography>
                <Typography variant="h5" color={"white"}>right: 179</Typography>
            </Box>
        </Grid>

    ); // lod=2 is the level of detail, you can adjust this as needed. Values: 0, 1 2.
    

    const personalInfoSection = (
        <Grid>
            <Paper sx={{ p: 2, minHeight: '85vh', maxHeight: '85vh', overflow: 'auto'  }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                            {<MuiAvatar alt="PB" src={checkPatientData('photo')} sx={{
                                width: 100, height: 100, '& > img': {
                                    transform: 'scale(2)' // Adjust the scale factor for the profile picture
                                }
                            }} />}
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
                                <IconButton aria-label="edit" onClick={() => handleButtonClick(editPatientButtonPath)}>
                                    <EditIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body2" color="text.secondary">{checkPatientData('birth')}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Username</Typography>
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
            <Typography align="left" variant="h6">Exercise Completion Rate</Typography>
            <PieChart exerciseData={taskCategory} />
        </Paper>
    );

    // Tasks Section
    const tasksSection = (
        <Box sx={{ width: '100%', flex: '1 1 auto', overflow: 'hidden' }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '47vh' }}>
                <Box display="flex" alignItems="center" sx={{ paddingBottom: 1 }}>
                    <Typography variant="h6">
                        Tasks
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none', marginLeft: 'auto' }}
                        onClick={() => handleButtonClick(manageTaskButtonPath)}
                    >
                        Manage
                    </Button>
                </Box>
                <Box sx={{ overflow: 'auto', flexGrow: 1, width:"100%" }}>
                    <TasksComponent taskList={currentPatient.tasks} showDate='none' layout={6} gridHeight={"55%"} parent={"patientDetails"}/>
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
                        {tasksSection} 
                        </Grid>
                        <Grid item xs={12}>
                        {exerciseCompletionChartSection}
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
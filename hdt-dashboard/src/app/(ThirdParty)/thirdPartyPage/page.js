'use client'
import React, { useEffect, useState } from "react";
import ThreeDAvatar from "@/app/components/three";
import Tooltip from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
    Box,
    Grid,
    Avatar,
    Paper,
    Button,
    Container,
    Typography,
    Divider,
    Card,
    CardContent,
    Dialog,
    DialogContent
} from "@mui/material";
import { useCookies } from "react-cookie";
import { reqCare, reqCarePatient, reqCarePatientThumbs, reqCareTherapist } from "@/app/api/api";
import TasksComponent from "@/app/components/taskList";
import CloseIcon from '@mui/icons-material/Close';

export default function TrdPage() {
    const [watchLiveEnabled, setWatchLiveEnabled] = useState(false);

    //get caregiver infomation
    const [cookies] = useCookies(["user_token"]);
    const caregiverInfo = cookies.user_token;

    //fetch caregiver and carepatient
    const [careTherapist,setCareTherapist] = useState({});
    const [carePatient,setCarePatient] = useState({});
    const[thumbsCount,setThumbsCount] = useState(0);
    const [patientTasks, setPatientTasks] = useState([]);

    useEffect(()=>{
        const fetchData = async() =>{
            try {
                const res = await reqCare(caregiverInfo.email);
                console.log(res);
                if (res) {
                    setCareTherapist(res.therapist);
                    setCarePatient(res.carePatient);
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        fetchData();
    },[])
    
    useEffect(() => {   // Prevent scrolling 
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);
    useEffect(()=>{
        setThumbsCount((carePatient.thumbs? carePatient.thumbs : 0) + (carePatient.thumbs_caregivers? carePatient.thumbs_caregivers : 0));
        setPatientTasks(carePatient.tasks);
    },[carePatient])
   
    const handleClickThumbsUp = async () => {
        // Update the thumbs-up count and the database in the background
        try {
            // Update the thumbs-up count locally
            setThumbsCount(thumbsCount + 1);
            // Update the database
            const res = await reqCarePatientThumbs();
            if (res===thumbsCount) {
                console.log("load in database");
            }
        } catch (error) {
            console.error("Failed to update database:", error);
            // If the database update fails, revert the frontend update
            setThumbsCount(thumbsCount - 1);
        }
    };

    const [open, setOpen] = useState(false);
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleOpen=() =>{
        setOpen(true);
      }

    const handleClickMore = ()=>{
        return (<Dialog
            fullWidth={true}
            maxWidth="xl"
            open={open}
            onClose={handleClose}>

                <DialogContent>
                    <Box sx={{}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Typography variant="h5" align="left">Journey</Typography>
                            <Box sx={{marginLeft:2}}>
                                <Typography variant="h7" align="right" display="inline">{carePatient.name} has </Typography>
                                <Typography variant="h7" align="right" display="inline" color="#5A6ACF" fontWeight="bold">{patientTasks? patientTasks.length:0}</Typography>
                                <Typography variant="h7" align="right" display="inline"> tasks left</Typography>
                            </Box>
                        </Box>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color:"grey"
                            }}
                            >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{height:"80%"}}>
                        <TasksComponent taskList={patientTasks? patientTasks : []} showDate={"block"} layout={3} />
                    </Box>
                </DialogContent>
                </Dialog>)
    }


    const LiveStreamCard = () => (
        <Grid sx={{ p: 3, height: "70%", overflow: 'hidden', backgroundImage:"/caregiverWelcome.svg"}}>
            <Box flexGrow={1} mb={5}>
                <div><Typography variant="h6" align="left">Welcome!</Typography></div>
                <div><Typography variant="h7" align="left">Cheer on {carePatient.name} right here</Typography></div>
            </Box>
            <Tooltip title={watchLiveEnabled ? "" : "Can only be used while in the same room"} placement="top">
                <span>
                    <Button variant="outlined" disabled={!watchLiveEnabled}>
                        Watch Live
                    </Button>
                </span>
            </Tooltip>
            <Tooltip title={`This will show the live feed of what ${carePatient.name} is seeing and doing`} sx={{ ml: 1 }}>                <IconButton aria-label="help">
                <HelpOutlineIcon fontSize="small" />
            </IconButton>
            </Tooltip>
        </Grid>
    );

    const TherapistCard = () => (
        <Grid container alignItems="center" sx={{ p: 3, height: "100%", overflow: 'hidden' }}>
            <Avatar alt={'currentPatient.name'} src={"/profilePictureTherapist.png"} sx={{ width: 100, height: 100 }} />
            <Box sx={{ pl: 3 }}>
                <div><Typography variant="h6" fontWeight="bold" color="#0D2560"></Typography>{carePatient.contact && carePatient.contact.fullName ? carePatient.contact.fullName : ""}</div>
                <div><Typography variant="h7" align="left">Contact person for {carePatient.name}</Typography></div>
            </Box>
            <Box mt={1} sx={{ width: '100%' }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h7" align="left">Therapist:</Typography>
                    <Typography variant="h7" align="right" fontWeight="bold" color="#0D2560"> {careTherapist.name}</Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h7" align="left">Contact number:</Typography>
                    <Typography variant="h7" align="right" fontWeight="bold" color="#0D2560">{careTherapist.phone}</Typography>
                </Grid>
            </Box>
        </Grid>
    );

    const ThumbsUpCard = () => (
        <Grid sx={{ p: 3, height: "70%", overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <ThumbUpIcon fontSize="large" flexGrow={1} sx={{ mb: 4, mt: 1 }} />
            <Typography variant="h7">Thumbs up given</Typography>
            <Typography variant="h4">{thumbsCount}</Typography>
        </Grid>
    );

    const UserCard = () => (
        <Grid container alignItems="center" sx={{ p: 3, height: "100%", overflow: 'hidden' }}>
            <Avatar alt={'currentPatient.name'} src={carePatient.photo} sx={{ width: 100, height: 100 }} /* This is profile picture avatar */ /> 
            <Box sx={{ pl: 3 }}>
                <div><Typography variant="h6">{carePatient.name}</Typography></div>
                <div>
                    <Typography variant="h4" align="left" display="inline">79</Typography>
                    <Typography variant="h7" align="left" display="inline"> hours exercised</Typography>
                </div>
            </Box>
            <Box mt={1} sx={{ width: '100%' }}>
                <Grid container my={1} direction="row">
                    <Typography variant="h7" align="left">Click the button to cheer on {carePatient.name}</Typography>
                </Grid>
            </Box>
            <Button variant="outlined" startIcon={<ThumbUpIcon />} onClick={()=>handleClickThumbsUp()} size="large">
                Give thumbs up
            </Button>
            <Tooltip title="Gives a thumps up to motivate"
                sx={{ ml: 1 }}
            >
                <IconButton aria-label="help">
                    <HelpOutlineIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Grid>
    );

    const ExerciseTasksCard = () => (
        <Box sx={{ width: '100%', flex: '1 1 auto', overflow: 'hidden', height: '46vh' }}>
            <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                <Grid sx={{ pb: 1, pl: 1, pr: 1 }} container direction="row" justifyContent="space-between">
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Typography variant="h5" align="left">Journey</Typography>
                        <Box sx={{marginLeft:2}}>
                            <Typography variant="h7" align="right" display="inline">{carePatient.name} has </Typography>
                            <Typography variant="h7" align="right" display="inline" color="#5A6ACF" fontWeight="bold">{patientTasks? patientTasks.length:0}</Typography>
                            <Typography variant="h7" align="right" display="inline"> tasks left</Typography>
                        </Box>
                    </Box>
                        <Button variant="contained" sx={{height:"35px"}} onClick={handleOpen}> More </Button>
                </Grid>
                <TasksComponent taskList={patientTasks? patientTasks : []} showDate={"none"} layout={4} />
                
            </Paper>
        </Box>
    );

    return (
        <Container sx={{
            paddingTop: '5%',
            overflow: 'hidden',
            minHeight: '98vh',
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <LiveStreamCard />
                                <Divider />
                                <TherapistCard />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper sx={{ display: 'flex', flexDirection: 'column',height: '100%'  }}>
                                <ThumbsUpCard />
                                <Divider />
                                <UserCard />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
                                <ExerciseTasksCard />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={4} >
                    <Box sx={{ width: '100%', height: '100%' }}>
                        <ThreeDAvatar glbModelUrl={carePatient.avatar ? carePatient.avatar : ""} />
                    </Box>
                </Grid>
            </Grid>
            {open && handleClickMore()}
        </Container>
    );
}

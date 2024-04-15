'use client'
import React, { useEffect, useState } from "react";
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { Avatar as VisageAvatar } from "@readyplayerme/visage";
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
    CardContent
} from "@mui/material";
import { tasksList } from "@/app/components/taskList";


export default function TrdPage() {
    const [open, setOpen] = useState("false");
    const [showList, setShowList] = useState("hidden");
    const [buttonName, setButton] = useState("more");
    const [avatarUrl, setAvatarUrl] = useState('');
    const handleClickMore = () => {
        if (open) {
            setShowList("auto");
            setButton("fold");
        } else {
            setShowList("hidden");
            setButton("more");
        }
        setOpen(!open);
    }

    useEffect(() => {   // Prevent scrolling 
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const LiveStreamCard = () => (
        <Grid sx={{ p: 3, height: "70%", overflow: 'hidden' }}>
            <Box flexGrow={1} mb={5}>
                <div><Typography variant="h6" align="left">Welcome!</Typography></div>
                <div><Typography variant="h7" align="left">Watch Jack exercise</Typography></div>
            </Box>
            <Button variant="outlined" >
                Watch Live
            </Button>
            <Tooltip title="This will show the live feed of what Jack is seeing and doing"
                sx={{ ml: 1 }}
            >
                <IconButton aria-label="help">
                    <HelpOutlineIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Grid>
    );

    const TherapistCard = () => (
        <Grid container alignItems="center" sx={{ p: 3, height: "100%", overflow: 'hidden' }}>
            <Avatar alt={'currentPatient.name'} src={"/path/to/default/avatar.jpg"} sx={{ width: 100, height: 100 }} />
            <Box sx={{ pl: 3 }}>
                <div><Typography variant="h6">Lotte Jensen</Typography></div>
                <div><Typography variant="h7" align="left">Physiotherapist for Jack</Typography></div>
            </Box>
            <Box mt={1} sx={{ width: '100%' }}>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h7" align="left">Therapist:</Typography>
                    <Typography variant="h7" align="right">Lotte Jensen</Typography>
                </Grid>
                <Grid container direction="row" justifyContent="space-between">
                    <Typography variant="h7" align="left">Contact number:</Typography>
                    <Typography variant="h7" align="right">12345678</Typography>
                </Grid>
            </Box>
        </Grid>
    );

    const ThumbsUpCard = () => (
        <Grid sx={{ p: 3, height: "70%", overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <ThumbUpIcon fontSize="large" flexGrow={1} sx={{ mb: 4, mt: 1 }} />
            <Typography variant="h7">Thumbs-Up Count</Typography>
            <Typography variant="h4">9</Typography>
        </Grid>
    );

    const UserCard = () => (
        <Grid container alignItems="center" sx={{ p: 3, height: "100%", overflow: 'hidden' }}>
            <Avatar alt={'currentPatient.name'} src={"/path/to/default/avatar.jpg"} sx={{ width: 100, height: 100 }} />
            <Box sx={{ pl: 3 }}>
                <div><Typography variant="h6">Jack Smith</Typography></div>
                <div>
                    <Typography variant="h4" align="left" display="inline">79</Typography>
                    <Typography variant="h7" align="left" display="inline"> hours exercised</Typography>
                </div>
            </Box>
            <Box mt={1} sx={{ width: '100%' }}>
                <Grid container my={1} direction="row">
                    <Typography variant="h7" align="left">Click the button to cheer on Jack</Typography>
                </Grid>
            </Box>
            <Button variant="outlined" startIcon={<ThumbUpIcon />} size="large">
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
                    <Typography variant="h5" align="left">Journey</Typography>
                    <div>
                        <Typography variant="h5" align="right" display="inline">5</Typography>
                        <Typography variant="h7" align="right" display="inline"> tasks left</Typography>
                    </div>
                </Grid>
                <Box sx={{ overflow: 'auto', flexGrow: 1, height: '100%' }}>
                    <Grid container spacing={2} direction="row" sx={{ height: '100%' }}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Grid item xs={4} key={item} sx={{ display: 'flex' }}>
                                <Card sx={{ width: '100%', height: '300px' }}>
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


    // Avatar settings
    const handleOnAvatarExported = (avatarEvent) => {
        setAvatarUrl(avatarEvent.data.url);
    };

    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: false,
        language: 'en',
    };

    const UserAvatar = () => (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100%' }}>
            <AvatarCreator subdomain="demo" config={config} style={{ width: '100%', height: '100%', border: 'none' }} onAvatarExported={handleOnAvatarExported} />
            {avatarUrl && <VisageAvatar modelSrc={avatarUrl} style={{ height: '100%' }} />}
        </Grid>
    );

    return (
        <Container sx={{
            paddingTop: '5%',
            display: 'flex',
            overflow: 'hidden',
            height: '98%', // Ensures the container takes up nearly the full height
            minWidth: '100%',
            display: 'flex', // Make this a flex container
            flexDirection: 'column' // Stack children vertically
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <LiveStreamCard />
                        <Divider orientation="horizontal" flexItem sx={{ pb: 1, pt: 1 }} />
                        <TherapistCard />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <ThumbsUpCard />
                        <Divider orientation="horizontal" flexItem sx={{ pb: 1, pt: 1 }} />
                        <UserCard />
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={6} sx={{ flexGrow: 1 }}>
                    <UserAvatar />
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ height: '100%', display: 'flex' }}>
                        <ExerciseTasksCard />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );

}








// Old code setup
/*
    return(
        <Grid container spacing={2}  >
        <Grid item xs={7} sm={7} md={7} lg={7} >
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box sx={{width:"49%"}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "23vh",
                            backgroundColor:'lightblue',
                            justifyContent:"center"
                        }}
                        >
                            
                            <h3>Welcome!</h3>
                            <h3>You're doing great</h3>
                            <p>Check your exercise data here</p>   
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            height: "23vh",
                            backgroundColor:'white',
                            alignItems:"center"
                        }}
                        >
                            <Avatar alt="Remy Sharp"
                                    src=""
                                    sx={{ width: 80, height: 80, border:"1px solid black", marginRight:1 }} />
                            <Box>
                            <p>Jack Smith</p>
                            <p>Age    34</p>
                            <p>Exercise    17days</p>
                            </Box>   
                    </Paper>
                </Box>
                <Box sx={{width:"49%"}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "23vh",
                            backgroundColor:'lightblue',
                            justifyContent:"center"
                        }}
                        >
                            
                            <h3>Welcome!</h3>
                            <h3>You're doing great</h3>
                            <p>Check your exercise data here</p>   
                    </Paper>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            height: "23vh",
                            backgroundColor:'white',
                            alignItems:"center"
                        }}
                        >
                            <Avatar alt="Remy Sharp"
                                    src=""
                                    sx={{ width: 80, height: 80, border:"1px solid black", marginRight:1 }} />
                            <Box>
                            <p>Jack Smith</p>
                            <p>Age    34</p>
                            <p>Exercise    17days</p>
                            </Box>   
                    </Paper>
                </Box>
            </Box>
                <Box>
                    <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop:"4vh",
                                height: "50vh",
                                backgroundColor:'white',
                                overflow:showList,
                            }}
                            >
                            <Box sx={{justifyContent:"space-between", display:"flex"}}>
                                <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                                    <h3>Tasks</h3> 
                                    <p>You have {tasksList.length} tasks now</p>
                                </Box>
                                <Button variant="contained" sx={{width:"80px", height:"40px"}} onClick={handleClickMore}> {buttonName} </Button>
                            </Box>
                            <Box sx={{display:"flex", marginTop:1, flexWrap:"wrap"}}>
                                {tasksList.map((v,i)=>(
                                    <Paper key={i} sx={{width:"31%",height:"40vh",p:2, margin:1}}>
                                        <p>{v.type}</p>
                                        <Box>
                                            <Box sx={{width:50, height:50}}></Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                           
                           
                    </Paper>
                </Box>
            </Grid>
        <Grid item xs={5} sm={5} md={5} lg={5}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100vh",
                    backgroundColor:'white',
                }}
                >
                    <h3>Avatar</h3>
            </Paper>
        </Grid>

    </Grid>

    )
    */
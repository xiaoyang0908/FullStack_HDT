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
    CardContent
} from "@mui/material";

export default function TrdPage() {
    const [open, setOpen] = useState("false");
    const [showList, setShowList] = useState("hidden");
    const [buttonName, setButton] = useState("more");
    const avatarUrl = 'currentPatient.avatar' + '?lod=2';
    
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
                            <Paper sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                        <ThreeDAvatar glbModelUrl={avatarUrl} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

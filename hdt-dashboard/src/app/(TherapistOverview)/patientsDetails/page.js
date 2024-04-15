'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { Avatar as VisageAvatar } from "@readyplayerme/visage";
import PieChart from "../../components/pieChart";
import {
    Box,
    Grid,
    Paper,
    Avatar,
    Typography,
    Divider,
    Container,
    Card,
    CardContent
} from "@mui/material";

export default function TherapistPatientsDetails() {
    const searchParams = useSearchParams();
    const currentPatient = JSON.parse(searchParams.get("patient") || "{}");
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleOnAvatarExported = (avatarEvent) => {
        setAvatarUrl(avatarEvent.data.url);
    };

    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: false,
        language: 'en',
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const PersonalInfo = () => (
        <Paper sx={{ height: "100%", display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                <Avatar alt={currentPatient.name} src={currentPatient.avatar || "/path/to/default/avatar.jpg"} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <Typography variant="h5">{currentPatient.name}</Typography>
            </Box>
            <Divider orientation="horizontal" flexItem sx={{ pb: 1, pt: 3 }} />
            <Box sx={{ overflowY: 'auto', flexGrow: 1, pr: 2 }}>
                <Grid container spacing={2} sx={{ pl: 4, pb: 2 }}>
                    {[
                        { label: "Birth date", value: "12 / 06 / 2000" },
                        { label: "Client's Tel.", value: "+45 12 34 56 78" },
                        { label: "Email", value: currentPatient.email },
                        { label: "Contact person", value: "Anna Jensen" },
                        { label: "Contact Person Tel.", value: "+45 87 65 43 21" },
                        { label: "Type of Movement impairment", value: "Limited Shoulder Mobility" },
                        { label: "Dominant arm", value: "Left" },
                        { label: "Therapy goals", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. psum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n" }
                    ].map(info => (
                        <Grid item xs={12} sx={{ mt: 1 }} key={info.label}>
                            <Typography variant="body1">{info.label}</Typography>
                            <Typography variant="body2" color="text.secondary">{info.value}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
    
    const ExerciseCompletion = () => (
        <Box sx={{ width: '100%', flex: '0 1 auto', mb: 2 }}>
            <Paper sx={{ p: 2 }}>
                <Typography textAlign="center" variant="h6">Exercise Completion Rate</Typography>
                <PieChart />
            </Paper>
        </Box>
    );
    
    const TasksSection = () => (
        <Box sx={{ width: '100%', flex: '1 1 auto', overflow: 'hidden' }}>  
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
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

    const UserAvatar = () => (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100%'}}>
            <AvatarCreator subdomain="demo" config={config} style={{ width: '100%', height: '100%', border: 'none' }} onAvatarExported={handleOnAvatarExported} />
            {avatarUrl && <VisageAvatar modelSrc={avatarUrl} />}
        </Grid>
    );
    
    return (
        <Container sx={{
            paddingTop: '6%', 
            display: 'flex', 
            overflow: 'hidden', 
            height: '98%', // Ensures the container takes up nearly the full height
            minWidth: '100%'
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <PersonalInfo />
                </Grid>
                <Grid item xs={12} sm={2} md={2} lg={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <ExerciseCompletion />
                        <TasksSection />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={6}>
                    <UserAvatar />
                </Grid>
            </Grid>
        </Container>
    );
    
}
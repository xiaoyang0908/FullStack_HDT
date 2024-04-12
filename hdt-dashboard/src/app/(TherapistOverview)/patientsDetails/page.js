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
    Button,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Container
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
        <Paper sx={{ p: 2, height: "90vh"  }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                <Avatar alt={currentPatient.name} src={currentPatient.avatar || "/path/to/default/avatar.jpg"} sx={{ width: 100, height: 100 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                <Typography variant="h5">{currentPatient.name}</Typography>
            </Box>
            <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
            <Grid container spacing={2} sx={{ pl: 4, pb: 2 }}>
                {[
                    { label: "Birth date", value: "12 / 06 / 2000" },
                    { label: "Client's Tel.", value: "+45 12 34 56 78" },
                    { label: "Email", value: currentPatient.email },
                    { label: "Contact person", value: "Anna Jensen" },
                    { label: "Contact Person Tel.", value: "+45 87 65 43 21" },
                    { label: "Type of Movement impairment", value: "Limited Shoulder Mobility" },
                    { label: "Dominant arm", value: "Left" },
                    { label: "Therapy goals", value: "Increase range of motion, Reduce pain, Strengthen shoulder" }
                ].map(info => (
                    <Grid item xs={12} sx={{ mt: 1 }} key={info.label}>
                        <Typography variant="body1">{info.label}</Typography>
                        <Typography variant="body2" color="text.secondary">{info.value}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );

    const ExerciseCompletion = () => (
        <Paper sx={{ p: 2, height: "44.2vh"}}>
        <Typography textAlign="center" variant="h6">Exercise Completion Rate</Typography>
            <PieChart />
        </Paper>
    );

    const TasksSection = () => (
        <Paper sx={{ p: 2, height: "44.2vh" }}>
        <Typography textAlign="center" variant="h6">Tasks</Typography>
            <List>
            </List>
        </Paper>
    );

    const UserAvatar = () => (
        <Grid container marginLeft="8%" sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', height: '100%' }}>
            <AvatarCreator subdomain="demo" config={config} style={{ width: '100%', height: '100%', border: 'none' }} onAvatarExported={handleOnAvatarExported} />
            {avatarUrl && <VisageAvatar modelSrc={avatarUrl} />}
        </Grid>
    );

    return (
        <Container sx={{ paddingTop: '4%', minWidth: '122%', overflow: 'hidden' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} sx={{ flexGrow: 1 }}>
                    <PersonalInfo />
                </Grid>
                <Grid item xs={12} md={2} sx={{ flexGrow: 1 }}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                            <ExerciseCompletion />
                        </Grid>
                        <Grid item xs={12}>
                            <TasksSection />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4.5} sx={{ flexGrow: 1 }}>
                    <UserAvatar />
                </Grid>
            </Grid>
        </Container>
    );
}

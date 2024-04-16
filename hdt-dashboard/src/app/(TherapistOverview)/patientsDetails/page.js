'use client'
import { useEffect, useState } from "react";
// import { usePatient } from "../../contexts/PatientContext";
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar as VisageAvatar } from "@readyplayerme/visage";
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
import {
    PaddingTwoTone,
    Male,
    EditIcon
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

/**
 * @typedef {Object} AvatarCreatorConfig
 * @property {boolean} [clearCache]
 * @property {BodyType} [bodyType]
 * @property {boolean} [quickStart]
 * @property {Language} [language]
 * @property {string} [token]
 * @property {string} [avatarId]
 * 
 * @param {AvatarExportedEvent} avatarEvent
 */

export default function TherapistPatientsDetails() {
    //  current.patient is the patient data
     const searchParams = useSearchParams();
     const currentPatient = searchParams.get("patient");
    // const {currentPatient} = usePatient();
     console.log(currentPatient);

    // Avatar creator configuration
    const style = { width: '100%', height: '90vh', border: 'none' };
    const [avatarUrl, setAvatarUrl] = useState('');
    const handleOnAvatarExported = (avatarEvent) => {
        console.log(`Avatar URL is: ${avatarEvent.data.url}`);
    };

    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: false,
        language: 'en',
    };

    useEffect(() => {   // Prevents scrolling on page
        document.body.style.overflow = 'hidden';
    }, []);

    const personalInfoSection = (
        <Grid>
            <Paper sx={{ p: 2, minHeight: '90vh', maxHeight: '90vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2 }}>
                            <Avatar alt="Jack Smith" src="/path/to/avatar.jpg" sx={{ width: 100, height: 100}} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                            <Typography variant="h5">
                                {currentPatient.name}
                            </Typography>
                        </Box>
                        <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
                    </Grid>
                    <Grid container spacing={2} sx={{ pl: 4, pb: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="body1">Birth date</Typography>
                            <Typography variant="body2" color="text.secondary">12 / 06 / 2000</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Client's Tel.</Typography>
                            <Typography variant="body2" color="text.secondary">+45 12 34 56 78</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Email</Typography>
                            <Typography variant="body2" color="text.secondary">{currentPatient.email}</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Contact person</Typography>
                            <Typography variant="body2" color="text.secondary">Anna Jensen</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Contact Person Tel.</Typography>
                            <Typography variant="body2" color="text.secondary">+45 87 65 43 21</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Type of Movement impairment</Typography>
                            <Typography variant="body2" color="text.secondary">Limited Shoulder Mobility</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Dominant arm</Typography>
                            <Typography variant="body2" color="text.secondary">Left</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 1 }}>
                            <Typography variant="body1">Therapy goals</Typography>
                            <Typography variant="body2" color="text.secondary">Increase range of motion, Reduce pain, Strenghten shoulder</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );

    // Exercise Completion section
    const exerciseCompletionChartSection = (
        <Paper sx={{ p: 2, minHeight: '44.2vh'}}>
            <Typography variant="h6">Exercise Completion Rate</Typography>
        </Paper>
    );

    // Tasks Section
    const tasksSection = (
        <Paper sx={{ p: 2, minHeight: '44.2vh' }}>
            <Typography variant="h6">Tasks</Typography>
            <List>
            </List>
        </Paper>
    );

    const userAvatar = (
        <Grid container sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <AvatarCreator subdomain="demo" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
            {avatarUrl && <VisageAvatar modelSrc={avatarUrl} />}
        </Grid>
    )

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
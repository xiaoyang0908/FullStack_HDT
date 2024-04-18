'use client'
import { useState, useEffect } from "react";
import { AvatarCreator, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar as VisageAvatar } from "@readyplayerme/visage";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Container,
    Divider,
    Avatar,
    TextField,
    MenuItem
} from "@mui/material";

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

export default function AddPatient() {

    // Information to be rendered within the basic info section
    const UserInfoContent = () => {
        const [firstName, setFirstName] = useState('Error Loading');
        const [lastName, setLastName] = useState('Error Loading');
        const [birthDate, setBirthDate] = useState(new Date());
        const [phoneNumber, setPhoneNumber] = useState('Error Loading');
        const [email, setEmail] = useState('Error Loading');
        const [biologicalSex, setBiologicalSex] = useState('Error Loading');
        const [typeOfMovement, setTypeOfMovement] = useState('Error Loading');
        const [dominantArm, setDominantArm] = useState('Error Loading');
        const [therapyGoals, setTherapyGoals] = useState('Error Loading');

        const containerSpacing = 8;    // spacing between grid items (name, birthday, number, email, sex)
        const bottomSpacingToTitle = 4; // spacing between title and first text field

        return (
            <>
                <Box sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1, width: '30%' }}>
                            <Typography variant="h5">Basic Information</Typography>
                            <Avatar alt="Profile Picture" src="/path/to/avatar.jpg" sx={{ width: '150px', height: '150px', marginTop: 2 }} />
                            <Button variant="contained" component="label" sx={{ margin: 2 }}>
                                Upload
                                <input type="file" hidden onChange={(event) => {/* handle img upload */ }} />
                            </Button>
                        </Box>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mr: 3, ml: 3 }}>
                            <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField label="First name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Last name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
                                </Grid>
                            </Grid>
                            <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Birth date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        value={birthDate}
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Phone number" variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth />
                                </Grid>
                            </Grid>
                            <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Biological Sex"
                                        value={biologicalSex}
                                        onChange={(e) => setBiologicalSex(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Divider sx={{ width: '95%', margin: 'auto', pt: 2 }} />

                    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
                        <Typography variant="h5">Recovery Plan</Typography>

                        <Typography sx={{ mt: bottomSpacingToTitle }} variant="body1">Type of movement impairment</Typography>
                        <TextField
                            placeholder="Maximum 150 characters"
                            variant="outlined"
                            multiline  // Make this a multiline TextField
                            minRows={3}  // Start with a single row
                            value={typeOfMovement}
                            onChange={(e) => setTypeOfMovement(e.target.value)}
                            inputProps={{ maxLength: 150 }}
                            fullWidth
                            sx={{
                                mt: 1
                            }}
                        />

                        <Typography sx={{ mt: 5 }} variant="body1">Dominant arm</Typography>
                        <TextField
                            select
                            value={dominantArm}
                            onChange={(e) => setDominantArm(e.target.value)}
                            variant="outlined"
                            fullWidth
                            SelectProps={{
                                displayEmpty: true,
                                renderValue: dominantArm !== '' ? undefined : () => <span style={{ opacity: 0.5 }}>Please choose</span>,
                            }}
                            sx={{ mt: 1, width: '20%' }}
                        >
                            <MenuItem value="" disabled>Please choose</MenuItem>
                            <MenuItem value="left">Left</MenuItem>
                            <MenuItem value="right">Right</MenuItem>
                            <MenuItem value="ambidextrous">Ambidextrous</MenuItem>
                        </TextField>

                        <Typography sx={{ mt: 5 }} variant="body1">Therapy goals</Typography>
                        <TextField
                            placeholder="Maximum 500 characters"
                            variant="outlined"
                            value={therapyGoals}
                            onChange={(e) => setTherapyGoals(e.target.value)}
                            inputProps={{ maxLength: 500 }}
                            multiline
                            minRows={7}
                            fullWidth
                            sx={{
                                mt: 1,
                                '& .MuiInputBase-inputMultiline': {
                                    resize: 'vertical',
                                    overflow: 'auto',
                                    verticalAlign: 'top'
                                }
                            }}
                        />
                    </Box>

                    <Divider sx={{ width: '95%', margin: 'auto', pt: 2 }} />

                    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
                        <Typography variant="h5" >Contact Person</Typography>
                        <Grid sx={{ mt: bottomSpacingToTitle }} container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    placeholder="Enter first name"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    placeholder="Enter email"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone Number"
                                    placeholder="Enter phone number"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </>
        );
    };

    const userInfoContent = <UserInfoContent />;

    const [content, setContent] = useState(userInfoContent);

    // Information to be rendered within the avatar section
    const AvatarContent = () => {
        const [avatarUrl, setAvatarUrl] = useState('');
        const handleOnAvatarExported = (avatarEvent) => {
            console.log(`Avatar URL is: ${avatarEvent.data.url}`);
            setAvatarUrl(avatarUrl);
        };

        const config = {
            clearCache: true,
            bodyType: 'fullbody',
            quickStart: false,
            language: 'en',
        };

        return (
            <Grid container sx={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
                <AvatarCreator
                    subdomain="demo"
                    config={config}
                    style={{ minWidth: '100%', minHeight: '90vh', border: 'none' }}
                    onAvatarExported={handleOnAvatarExported}
                />
                {avatarUrl && <VisageAvatar modelSrc={avatarUrl} />}
            </Grid>
        );
    };
    
    const avatarContent = <AvatarContent />;

    // Update the content displayed based on the menu item selected
    const UpdateContent = (newTitle) => {
        switch (newTitle) {
            case 'User Information':
                setContent(userInfoContent);
                break;
            case 'Avatar':
                setContent(avatarContent);
                break;
            default:
                setContent('No content available');
        }
    };

    const menuItems = (
        <Paper elevation={3}>
            <Box>
                <Button fullWidth onClick={() => UpdateContent("User Information")} sx={{ fontSize: '15px', padding: '10px 0' }}>
                    User Information
                </Button>
                <Divider />
                <Button fullWidth onClick={() => UpdateContent("Avatar")} sx={{ fontSize: '15px', padding: '10px 0' }}>
                    Avatar
                </Button>
            </Box>
        </Paper>
    );

    const displayCard = (
        <Grid item xs={12} md={10}>
            <Paper elevation={3} sx={{ minHeight: '90vh', overflowY: 'auto' }}>
                <Box sx={{ height: '100%' }}>
                    {content}
                </Box>
            </Paper>
        </Grid>
    );

    return (
        <Container sx={{ paddingTop: '6vh', minWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={2}>
                    {menuItems}
                </Grid>
                {displayCard}
            </Grid>
        </Container>
    );
}
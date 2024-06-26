'use client'
import { useState, useEffect, useRef } from "react";
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
import { reqSavePatient } from "@/app/api/api";
import { CookieSetting } from "@/app/util/cookieSetting";
import formatDate from "@/app/util/date";
import { useRouter } from "next/navigation";
import { ClickBack } from "@/app/components/clickBack"

export default function AddPatient() {
    const router = useRouter();
    const {getToken} = CookieSetting();
    const therapistInfo = getToken();
    const [patientProfile, setPatientProfile] = useState({});
    // Information to be rendered within the basic info section
    const UserInfoContent = () => {
        const storedPatientData = localStorage.getItem("currentPatient");
        const editPatient = storedPatientData ? JSON.parse(storedPatientData) : {};
        console.log(editPatient);

        // Extract name and contact details from editPatient if available
        const nameArray = editPatient.name ? editPatient.name.split(" ") : [];
        const contactName = editPatient.contact && editPatient.contact.fullName ? editPatient.contact.fullName.split(" ") : [];
        const storedBirth = editPatient.birth?new Date(editPatient.birth):new Date(); 
        const formattedBirthDate = storedBirth.toISOString().split('T')[0]; 
        const storedSex = editPatient.sexual? editPatient.sexual: "female";
        const storedArm = editPatient.dominantArm? editPatient.dominantArm: "left";

        // set initial value
        const [patientProfile, setPatientProfile] = useState(editPatient || {});
        const [patientID, setPatientID] = useState(editPatient.patientID || null);
        const [photo, setPhoto] = useState(editPatient.photo || '');
        const [id, setId] = useState(editPatient.id || null);
        const [firstName, setFirstName] = useState(nameArray[0] || '');
        const [lastName, setLastName] = useState(nameArray[1] || '');
        const [birthDate, setBirthDate] = useState(formattedBirthDate);
        const [phoneNumber, setPhoneNumber] = useState(editPatient.phone || '');
        const [email, setEmail] = useState(editPatient.email || ''); // In this case used as Username
        const [biologicalSex, setBiologicalSex] = useState(storedSex);
        const [typeOfMovement, setTypeOfMovement] = useState(editPatient.impaired || '');
        const [dominantArm, setDominantArm] = useState(storedArm);
        const [therapyGoals, setTherapyGoals] = useState(editPatient.goals || '');
        const [avatarUrl, setAvatarUrl] = useState(editPatient.avatar || '');
        const [tasks, setTasks] = useState(editPatient.tasks || []);
        const [thumbs, setThumbs] = useState(editPatient.thumbs || 0);
        const [thumbs_caregivers, setThumbsCaregivers] = useState(editPatient.thumbs_caregivers || 0);
        const [contact, setContact] = useState({
            firstName: contactName[0] || '',
            lastName: contactName[1] || '',
            email: editPatient.contact ? editPatient.contact.email : '',
            phoneNumber: editPatient.contact ? editPatient.contact.phoneNumber : ''
        });
        

        const generatePassword = (email) => {   // In this case used as Username
            if (!email) {
                return undefined; // Return undefined if no email is provided
            }
            // Generate password based on the email
            const lowerCaseEmail = email.toLowerCase();
            return lowerCaseEmail + "password";
        };
        
        
        const handleContact = (event) =>{
            const{name,value} = event.target;
            setContact((prevUserData) => ({
                ...prevUserData,
                [name]: value,
            }));
        }

        useEffect(()=>{
            setPatientProfile({
                id:id,
                patientID: patientID,
                password: editPatient.password ? editPatient.password : generatePassword(email),
                birth: formatDate(birthDate),
                name: `${firstName} ${lastName}`,
                email: email,   // In this case used as Username
                phone: phoneNumber,
                photo: photo,
                caregivers: "",
                therapists: "",
                impaired: typeOfMovement,
                dominantArm: dominantArm,
                goals: therapyGoals,
                tasks: tasks,
                sexual: biologicalSex,
                avatar: avatarUrl,
                contact: {
                    fullName: `${contact.firstName} ${contact.lastName}`,
                    email: contact.email,
                    phoneNumber: contact.phoneNumber
                },
                thumbs: thumbs,
                thumbs_caregivers: thumbs_caregivers,
            });
        }, [id, patientID, tasks, thumbs, thumbs_caregivers, birthDate, firstName, lastName, email, phoneNumber, photo, typeOfMovement, dominantArm, therapyGoals, biologicalSex, contact, avatarUrl]);
        
        const handleProfilePictureUpload = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImageUrl = e.target.result;
                    setPhoto(newImageUrl);
                };
                reader.readAsDataURL(file);
            }
        };
        const handleSubmit = async(event) => {
            event.preventDefault();    
            console.log("handle submit",patientProfile);
            const res = await reqSavePatient(therapistInfo.email, patientProfile);
            if (res === "success") {
                console.log("saved patient");
               router.back();
            }
        };

        const containerSpacing = 8;    // spacing between grid items (name, birthday, number, email, sex)
        const bottomSpacingToTitle = 4; // spacing between title and first text field

        return (
            <>
                <Box component="form" sx={{ maxHeight: '87vh', overflowY: 'auto' }}  onSubmit={handleSubmit}>
                    <Box  sx={{ p: 3, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 1, width: '30%' }}>
                            <Typography variant="h5">Basic Information</Typography>
                            <Avatar alt="Profile Picture" src={patientProfile.photo || "/path/to/default/avatar.jpg"} sx={{ width: '150px', height: '150px', marginTop: 2 }} />
                            <Button variant="contained" component="label" sx={{ margin: 2 }}>
                                Upload
                                <input type="file" hidden onChange={handleProfilePictureUpload} />
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', mr: 3, ml: 3 }}>
                            <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField label="First name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="off" fullWidth />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Last name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="off" fullWidth />
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
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Phone number" variant="outlined" autoComplete="off" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth />
                                </Grid>
                            </Grid>
                            <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField 
                                    label="Username" 
                                    variant="outlined" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    autoComplete="off"
                                    />
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
                            {/* <Grid container spacing={containerSpacing}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        autoComplete="new-password"
                                        />
                                </Grid>
                            </Grid> */}
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


                    <AvatarContent setAvatarUrl={setAvatarUrl} />

                    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
                        <Typography variant="h5" >Contact Person</Typography>
                        <Grid sx={{ mt: bottomSpacingToTitle }} container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    variant="outlined"
                                    fullWidth
                                    value ={contact.firstName}
                                    onChange={handleContact}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    variant="outlined"
                                    fullWidth
                                    value={contact.lastName}
                                    onChange={handleContact}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    placeholder="Enter email"
                                    variant="outlined"
                                    fullWidth
                                    value={contact.email}
                                    onChange={handleContact}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    placeholder="Enter phone number"
                                    variant="outlined"
                                    fullWidth
                                    value={contact.phoneNumber}
                                    onChange={handleContact}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </>
        );
    };
    
    function AvatarContent({ setAvatarUrl }) {
        const iframeRef = useRef(null);

        useEffect(() => {
            const handleMessages = (event) => {
                // Ensure the message comes from the expected domain
                if (event.origin === "https://rehab.readyplayer.me") {
                    let data;
                    try {
                        // Attempt to parse the message data as JSON
                        data = JSON.parse(event.data);
                    } catch {
                        data = event.data;
                    }
    
                    // Check if the data includes a .glb URL
                    if (typeof data === 'string' && data.endsWith('.glb')) {
                        console.log("Received Avatar URL:", data);
                        setAvatarUrl(data);
                    }
                }
            };
    
            window.addEventListener('message', handleMessages);
            return () => {
                window.removeEventListener('message', handleMessages);
            };
        }, [setAvatarUrl]);
    
        return (
            // Render the avatar using the avatarUrl prop
            <Grid container sx={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
                <iframe
                    ref={iframeRef}
                    style={{ minWidth: '100%', minHeight: '90vh', border: 'none' }}
                    src="https://rehab.readyplayer.me/avatar?frameApi"
                />
            </Grid>
        );
    }

    const displayCard = (
        <Grid item xs={12} md={10}>
            <Paper elevation={3} sx={{ minHeight: '90vh', overflowY: 'auto' }}>
                <Box sx={{ height: '100%' }}>
                    <UserInfoContent setPatientProfile={setPatientProfile}></UserInfoContent>
                </Box>
            </Paper>
        </Grid>
    );

    return (
        <Container sx={{ paddingTop: '6vh', minWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}>
            <ClickBack username={"New Student"} pagename={"Basic Information"} path={"/therapistPage"} />
            <Grid container spacing={0} justifyContent="center">
                {displayCard}
            </Grid>
        </Container>
    );
}
import React, { useState } from 'react';
import { Box, TextField, Button, InputLabel, Alert} from '@mui/material';
import { useRouter } from 'next/navigation';
import { reqLogin } from '@/api/api';
import Snackbar from '@mui/material/Snackbar';



export default function Login(){
    const [open, setOpen] = useState(false);
    const [loginSymbol, setLoginSymbol] = useState("error");

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  

    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });
    const [msg, setMsg]= useState("Incorrect email or password");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    // get username and password ==Object -->res={}
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Username: ${userData.username}, Password: ${userData.password}`);
        try {
            const res = await reqLogin(userData.username,userData.password);
            console.log(res);
            if(res.status==="online"){
                setLoginSymbol("success");
                setMsg("Login Successfully");
                handleOpen();
                if(res.role === "Patient"){
                    router.replace("/patientPage");
                }else if(res.role === "Therapist"){
                    router.replace("/therapistPage");
                }else if(res.role === "Caregiver"){
                    router.replace("/thirdPartyPAge");
                }
            }else {
                throw new Error("Login failed");
            }
        } catch (error) {
            setLoginSymbol("error");
            setMsg("Incorrect email or password");
            handleOpen(); // Open the Snackbar with the new message
        }
        setLoginSymbol("error");
        setMsg("Incorrect email or password");
        router.replace("/")
       
    };

    // const LoginImg = require("../../../public/Loginimg/login.svg")

    return (
        <Box sx={{display:"flex"}}>
            <Box sx={{width:"35vw", height:"60vh", alignItems:"center", justifyContent:"center", display:"flex"}}>
                <img src="/Loginimg/login.svg" alt="Login Picture" sx={{width:"30vw", height:"25vh"}} loading="lazy"/>
            </Box>

            <Box sx={{width:"25vw", height:"60vh",bgcolor:"white", display:"flex", flexDirection:"column", justifyContent:"center", alignitem:"center", }}>
                <Box margin={4}>
                    <p>Welcome to the Dashboard</p>
                    <p>Please log in</p>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={3000} // Increase to 3 seconds
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar position
                >
                    <Alert onClose={handleClose} severity={loginSymbol}>
                        {msg}
                    </Alert>
                </Snackbar>
                <Box sx={{ display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <form onSubmit={handleSubmit} style={{width:"80%"}}>
                        <InputLabel htmlFor="component-simple">Account</InputLabel>
                        <TextField
                            id='component-simple'
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <InputLabel htmlFor="component-simple1">Password</InputLabel>
                        <TextField
                            id='component-simple1'
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Continue
                        </Button>
                    </form>
                </Box>
            </Box>
            
        </Box>
    );
}


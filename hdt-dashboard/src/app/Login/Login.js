import React, { useState } from 'react';
import { Box, TextField, Button, InputLabel, Alert} from '@mui/material';
import { useRouter } from 'next/navigation';
import { reqLogin } from '@/api/api';
import Snackbar from '@mui/material/Snackbar';



export default function Login(){
    const [open, setOpen] = useState(false);
    const [loginSymbol, setLoginSymbol] = useState("error")

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

    // get username and password
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${userData.username}, Password: ${userData.password}`);
        reqLogin(userData.username,userData.password).then((res)=>{
            console.log(`${res.data}`)
            if(res.status===1){
                setMsg("Login Successfully");
                setLoginSymbol("error");
                if(res.data.role === "Patient"){
                    router.replace("/patientPage");
                }else if(res.data.role === "Therapist"){
                    router.replace("/therapistPage");
                }else if(res.data.role === "Caregiver"){
                    router.replace("/thirdPartyPAge");
                }
            }else{
                setMsg("Incorrect email or password")
                setLoginSymbol("suceess")
            }
        })
        router.replace("/")
       
    };

    const LoginImg = require("../../../public/Loginimg/login.svg")

    return (
        <Box sx={{display:"flex"}}>
            <Box sx={{width:"30vw", height:"45vh", alignItems:"center", justifyContent:"center", display:"flex"}}>
                <img src="/Loginimg/login.svg" alt="Login Picture" sx={{width:"30vw", height:"25vh"}} loading="lazy"/>
            </Box>

            <Box sx={{width:"25vw", height:"45vh",bgcolor:"white", display:"flex", flexDirection:"column", justifyContent:"center", alignitem:"center", }}>
                <Box margin={4}>
                    <p>Welcome to the Dashboard</p>
                    <p>Please log in</p>
                </Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000} // 控制自动隐藏的时间（毫秒）
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar 出现的位置
                >
                    <Alert onClose={handleClose} severity={loginSymbol}>
                        {msg}
                    </Alert>
                </Snackbar>
                <Box sx={{ display:"flex",justifyContent:"center", alignItems:"center"}}>
                    <form onSubmit={handleSubmit} style={{width:"80%"}}>
                        <InputLabel htmlFor="component-simple">Account</InputLabel>
                        <TextField
                            name="username"
                            label="Username"
                            value={userData.username}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={userData.password}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <Box  sx={{
                                display: "flex",
                                justifyContent: "flex-end", // 按钮右对齐
                                marginTop: 2,          // 使按钮位于底部
                            }}>
                             <Button type="submit" variant="contained" color="primary" onClick={handleOpen}>
                                Continue
                            </Button>
                        </Box>
                        
                    </form>
                </Box>
            </Box>
            
        </Box>
    );
}


import React, { useState } from 'react';
import { Box, TextField, Button, InputLabel} from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Login(){
    const router = useRouter();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        router.push("/therapistPage")
        console.log(`Username: ${userData.username}, Password: ${userData.password}`);
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
                             <Button type="submit" variant="contained" color="primary">
                                Continue
                            </Button>
                        </Box>
                        
                    </form>
                </Box>
            </Box>
            
        </Box>
    );
}


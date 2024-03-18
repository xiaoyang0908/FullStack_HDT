import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                name="username"
                label="Username"
                value={userData.username}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
    );
}


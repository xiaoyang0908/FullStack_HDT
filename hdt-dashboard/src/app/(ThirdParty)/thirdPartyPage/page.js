'use client'
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


export default function TrdPage(){
    const [circle, setCircle] = useState(10);

    useEffect(() =>{

    },[])
    return(
        <Box sx={{display:"flex"}}>
            <Box sx={{width:"50vw", height:"100vh", border:"1px solid black"}}>
                
            </Box>

            <Box sx={{width:"25vw", height: "100vh", display: "flex",  border:"1px solid black",flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", position: "relative" }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" />
                    <Box
                        sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                    >
                        <Typography variant="caption" component="div" color="text.secondary">
                        {}
                        </Typography>
                    </Box>
                </Box>
                <Button variant="contained" sx={{width:200, height:70,fontSize:23, position: "absolute", bottom: 10, right: 0 }}>Log out</Button>
            </Box>
            
        </Box>
    )
}
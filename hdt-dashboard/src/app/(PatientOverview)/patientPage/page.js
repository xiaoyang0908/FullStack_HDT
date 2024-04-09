'use client'
// import { tasksList } from "@/components/taskList";
import { Box, Grid, Paper, Avatar, Button,Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { Avatar as VisageAvatar} from "@readyplayerme/visage";
import { CookieSetting } from "@/app/util/cookieSetting";
import LogOut from "@/app/components/appBar";

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
export default function PatientOverview(){
    /*
    @typedef
    
    */
    const [userInfo, setUserInfo] = useState("");
    const {getToken} = CookieSetting();
    const handleToken = async() =>{
        const token = await getToken();
        return token;
    }
    useEffect(()=>{
        handleToken().then(token => {
            setUserInfo(token.name);
            console.log(token); // token
        });
    },[userInfo])
   
  
    
    const [open, setOpen] = useState("false");
    const [showList, setShowList] = useState("hidden");
    const [buttonName, setButton] = useState("more");
    const handleClickMore = () =>{
        if(open){
            setShowList("auto");
            setButton("fold");
        }else{
            setShowList("hidden");
            setButton("more");
        }
        setOpen(!open);
    }
    
    const config = {
        clearCache: true,
        bodyType: 'fullbody',
        quickStart: false,
        language: 'en',
    };

    const style = {width: '100%', height: '100vh', border: 'none'};
    const [avatarUrl, setAvatarUrl] = useState('');
    const handleOnAvatarExported = (avatarEvent) => {
        console.log(`Avatar URL is: ${avatarEvent.data.url}`);
      };

    return (
        <Box sx={{ overflow: 'hidden', height: '100vh'}}>
        <LogOut 
            shadow={true}
            bgColour={"white"}/>
        <Grid container spacing={2} padding={4}>
            {/* Left Column: Patient Info, Journey, Thumbs-Up Count */}
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100vh' }}>

                {/* Patient Info */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">{userInfo ? userInfo : "Loading..."}</Typography>
                </Paper>

                {/* Journey Button */}
                <Button variant="contained" sx={{ alignSelf: 'center' }}>Journey</Button>

                {/* Thumbs-Up Count */}
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6">Thumbs-Up Count</Typography>
                    <Typography variant="h4">12</Typography>
                </Paper>

                {/* Contact Person and Therapist */}
            </Grid>

            {/* Middle Column: Avatar */}
            <Grid item xs={4} style={{ height: '100%' }}>
                <Box sx={{ width: '100%', height: '100%', backgroundColor: 'lightgrey' }}>
                    <Typography>Avatar Placeholder</Typography>
                </Box>
            </Grid>

            {/* Right Column: Range of Motion and Check Animation */}
            <Grid item xs={4} sx={{ 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // centers vertically
                alignItems: 'center', // centers horizontally (if needed)
                height: '100vh' // ensure full height
            }}>
                <Paper elevation={3} sx={{ p: 2, width: '100%', textAlign: 'center' }}>
                    <Typography variant="h6">Range of Motion</Typography>
                    {/* Components to represent the range of motion */}
                </Paper>

                <Button variant="contained" sx={{ mt: 2 }}>Check Animation</Button>
            </Grid>
        </Grid>
        </Box>
    );
}
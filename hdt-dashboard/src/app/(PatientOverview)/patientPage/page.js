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


// Old patient layout to be used for the therapist view of the patient
/*
    return(
        <Grid container spacing={2} padding={4}>
            <Grid item xs={7} sm={7} md={7} lg={7} >
                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Box sx={{width:"38%",}}>
                        <Box sx={{display:"flex"}}>
                            <Paper sx={{p:2, width:"48%", height:"14vh"}}>
                                
                            </Paper>
                            <Paper sx={{p:2, width:"48%", height:"14vh", marginLeft:2}}>

                            </Paper>
                        </Box>
                        <Box sx={{height:"26vh", marginTop:"2vh"}}>
                            <Paper
                                sx={{
                                    p: 2,
                                }}
                                >
                                    <Box sx={{ display: 'flex',
                                                height: "13vh",
                                                backgroundColor:'white',
                                                alignItems:"center"}}>
                                        <Avatar alt="Remy Sharp"
                                                src=""
                                                sx={{ width: 80, height: 80, border:"1px solid black", marginRight:1 }} />
                                        <Box>
                                        <p>Jack Smith</p>
                                        <p>ID:</p>
                                        </Box>   
                                    </Box>
                                    <Box sx={{width:"100%", height:"1px", bgcolor:"lightgray",}}></Box>
                                    <Box sx={{ display: 'flex',
                                                height: "13vh",
                                                backgroundColor:'white',
                                                alignItems:"center"}}>
                                            <h3>level!</h3>
                                    </Box>
                            </Paper>
                        </Box>
                       
                    </Box>
                    <Box sx={{width:"60%", marginLeft:3}}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: "23vh",
                                backgroundColor:'lightblue',
                            }}
                            >
                                <h3>Thumbs</h3>
                        </Paper>
                        <Paper
                            sx={{
                                paddingLeft:2,
                                height: "23vh",
                                backgroundColor:'white',
                                alignItems:"center"
                            }}
                            >
                            <Box sx={{display:"flex", alignItems:"center", height:"12vh"}}>
                                <Avatar alt="Remy Sharp"
                                        src=""
                                        sx={{ width: 60, height: 60, border:"1px solid black", marginRight:1 }} />
                                <p>Emma</p>
                            </Box>
                            <Box sx={{display:"flex", alignItems:"center",}}>
                                <Avatar alt="Remy Sharp"
                                        src=""
                                        sx={{ width: 60, height: 60, border:"1px solid black", marginRight:1 }} />
                                <p>Dr. Emily Johnson</p>
                            </Box>
                               
                        </Paper>
                        </Box>
                    </Box>
                    <Box>
                        <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginTop:"4vh",
                                    height: "50vh",
                                    backgroundColor:'white',
                                    overflow:showList,
                                }}
                                >
                                <Box sx={{justifyContent:"space-between", display:"flex"}}>
                                    <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                                        <h3>Tasks</h3> 
                                        <p>You have {tasksList.length} tasks now</p>
                                    </Box>
                                    <Button onClick={handleClickMore} variant="contained" sx={{width:"80px", height:"40px"}}> {buttonName} </Button>
                                </Box>
                                
                                <Box sx={{display:"flex", marginTop:1, flexWrap:"wrap"}}>

                                    {tasksList.map((v,i)=>(
                                        <Paper key={i} sx={{width:"31.5%",height:"40vh",p:2, margin:1}}>
                                            <p>{v.type}</p>
                                            <Box>
                                                <Box sx={{width:50, height:50}}></Box>
                                            </Box>
                                        </Paper>
                                    ))}
                                </Box>
                               
                               
                        </Paper>
                    </Box>
                </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: "100vh",
                        backgroundColor:'white',
                    }}
                    >
                        <h3>Range of motion(ROM)</h3>
                        {// <AvatarCreator subdomain="demo" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
                        //{avatarUrl && <VisageAvatar modelSrc={avatarUrl}/>} }
                </Paper>
            </Grid>
        </Grid>
)
*/

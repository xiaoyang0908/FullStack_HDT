import { tasksList } from "@/components/taskList";
import { Box, Grid, Paper, Avatar} from "@mui/material";

export default function PatientOverview(){
    
    return(
            <Grid container spacing={2} padding={4}>
                <Grid item xs={7} sm={7} md={7} lg={7} >
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Box sx={{width:"38%"}}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "18vh",
                                    backgroundColor:'lightblue',
                                    justifyContent:"center"
                                }}
                                >
                                    
                                    <h3>Welcome!</h3>
                                    <h3>You're doing great</h3>
                                    <p>Check your exercise data here</p>   
                            </Paper>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    height: "18vh",
                                    backgroundColor:'white',
                                    alignItems:"center"
                                }}
                                >
                                    <Avatar alt="Remy Sharp"
                                            src=""
                                            sx={{ width: 80, height: 80, border:"1px solid black", marginRight:1 }} />
                                    <Box>
                                    <p>Jack Smith</p>
                                    <p>Age    34</p>
                                    <p>Exercise    17days</p>
                                    </Box>   
                            </Paper>
                        </Box>
                        <Box sx={{width:"60%"}}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: "18vh",
                                    backgroundColor:'white',
                                }}
                                >
                                    <h3>level</h3>
                            </Paper>
                            <Paper
                                sx={{
                                    marginTop:"2vh",
                                    p: 2,
                                    display: 'flex',
                                    height: "16vh",
                                    backgroundColor:'white',
                                    alignItems:"center"
                                }}
                                >
                                    <Box sx={{width:"50%"}}>
                                        <p>Contact person</p>
                                        <Box sx={{display:"flex", marginTop:2, alignItems:"center"}}>
                                            <Avatar alt="Remy Sharp"
                                                    src=""
                                                    sx={{ width: 50, height: 50, border:"1px solid black", marginRight:1 }} />
                                            <p>Emma</p>
                                        </Box>
                                    </Box>
                                    <Box sx={{width:"1px", height:100, bgcolor:"lightgrey"}} />
                                    <Box sx={{width:"50%", marginLeft:2}}>
                                        <p>Therapist</p>
                                        <Box sx={{display:"flex", marginTop:2, alignItems:"center"}}>
                                            <Avatar alt="Remy Sharp"
                                                    src=""
                                                    sx={{ width: 50, height: 50, border:"1px solid black", marginRight:1 }} />
                                            <p>Dr. Emily Johnson</p>
                                        </Box>
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
                                        height: "60vh",
                                        backgroundColor:'white',
                                        overflow:"hidden",
                                    }}
                                    >
                                    <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                                        <h3>Tasks</h3> 
                                        <p>You have {tasksList.length} tasks now</p>
                                    </Box>
                                    <Box sx={{display:"flex", marginTop:1, flexWrap:"wrap"}}>
                                        {tasksList.map((v,i)=>(
                                            <Paper key={i} sx={{width:"31%",height:"24vh",p:2, margin:1}}>
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
                            <h3>Avatar</h3>
                    </Paper>
                </Grid>

            </Grid>
        
    )
}
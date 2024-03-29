'use client'
import { Box, Grid, Avatar, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { tasksList } from "@/components/taskList";


export default function TrdPage(){
    return(
        <Grid container spacing={2} padding={4}>
        <Grid item xs={7} sm={7} md={7} lg={7} >
            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <Box sx={{width:"49%"}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "23vh",
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
                            height: "23vh",
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
                <Box sx={{width:"49%"}}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: "23vh",
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
                            height: "23vh",
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
                                overflow:"hidden",
                            }}
                            >
                            <Box sx={{justifyContent:"space-between", display:"flex"}}>
                                <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                                    <h3>Tasks</h3> 
                                    <p>You have {tasksList.length} tasks now</p>
                                </Box>
                                <Button variant="contained" sx={{width:"80px", height:"40px"}}> More </Button>
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
                    <h3>Avatar</h3>
            </Paper>
        </Grid>

    </Grid>

    )
}
import styles from "./page.module.css";
import { Box, Container, Grid, Paper } from "@mui/material";

export default function TherapistOverview(){
    return(
        // <Container sx={{marginTop:"20px"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 200,
                            backgroundColor:'white',
                        }}
                        >
                            <h3>welcome xxxxx</h3>
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} >
                    <Box>
                        <h3>Your Patients</h3>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 150,
                                backgroundColor:'white',
                            }}
                            >
                                <h3>welcome xxxxx</h3>
                        </Paper>
                    </Box>
                    <Box sx={{marginTop:2}}>
                    <h3>Patients Today</h3>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 250,
                                backgroundColor:'white',
                            }}
                            >
                                <h3>welcome xxxxx</h3>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                    <h3>Schedule</h3>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 444,
                            backgroundColor:'white',
                        }}
                        >
                            <h3>welcome xxxxx</h3>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    
                </Grid>
                
            </Grid>
        // </Container>   
        
    )
}
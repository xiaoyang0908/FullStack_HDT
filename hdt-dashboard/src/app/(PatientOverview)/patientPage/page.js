
import { Box, Container, Grid, Paper } from "@mui/material";

export default function PatientOverview(){
    return(
            <Grid container spacing={4} marginTop={1}>
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
                                height: 180,
                                backgroundColor:'white',
                            }}
                            >
                                <h3>welcome xxxxx</h3>
                        </Paper>
                    </Box>
                    <Box marginTop={4}>
                    <h3>Patients Today</h3>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 330,
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
                            height: 570,
                            backgroundColor:'white',
                        }}
                        >
                            <h3>welcome xxxxx</h3>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    
                </Grid>
                
            </Grid>
        
    )
}
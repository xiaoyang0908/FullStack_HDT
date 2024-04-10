import { Button,Box,Typography, Grid } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBackIosNewRounded";

export default function ManageTasks(){

    return(
        <Box sx={{display:"flex" ,flexDirection:"column"}}>
            <Box sx={{display:"flex"}} fullwidth>
                <Button>
                    <BackIcon />
                </Button>
                <p>Clients/"name"/ManageTasks</p>
            </Box>
            <Box sx={{height:"70vh",width:"90vw"}}>
                
            </Box>
            <Box>
                <Typography variant="h4">
                    Add Tasks
                </Typography>
                <Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                    <Grid></Grid>
                </Grid>
            </Box>
        </Box>
    )
}
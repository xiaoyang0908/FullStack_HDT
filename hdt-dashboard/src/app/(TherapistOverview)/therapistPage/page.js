import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp  from '@mui/icons-material/ThumbUpAltOutlined';
import { patientsList } from '@/components/patientsList';
import {TextField, Box,Avatar, Button, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Container } from "@mui/material";

export default function TherapistOverview(){
    return(
        <Container>
            <TextField
                sx={{width:"80vw", backgroundColor:"white", borderRadius:2}}
                label="Search input"
                InputProps={{
                type: 'search',
                }}
            />
            <Box sx={{display:"flex", width:"80vw", justifyContent:"space-between", marginTop:3}}>
                <Button variant="outlined" endIcon={<SortIcon/>}>
                    Name A-z
                </Button>
                <Button variant='contained' startIcon={<AddIcon/>}>
                    Add patient
                </Button>
            </Box>
                        
            <TableContainer  sx={{width:"80vw",marginTop:2}}>
                <Table >
                    <TableBody>
                        {patientsList.map((row)=>(
                            <TableRow key={row.name}>
                                <TableCell component="th" scope='row'>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", height:70,bgcolor:"white", borderRadius:2}}>
                                        <Box sx={{display:"flex",alignItems:"center",marginLeft:2, height:50, width:300,}}>
                                            <Avatar alt="Remy Sharp"
                                                src=""
                                                sx={{ width: 50, height: 50, border:"1px solid black", marginRight:1 }} />
                                            <Box>
                                            <p><h4>{row.name}</h4></p>
                                            <p>Current tasks: {row.totalTask} ({row.currentTask}/{row.totalTask})</p>
                                            </Box>
                                           
                                        </Box>

                                        <Box>
                                            <p>Total exercise: {row.exerciseHour}h</p>
                                            <p>This week: {row.weekHour}h</p>
                                        </Box>
                                        <Box sx={{marginRight:2}}>
                                            <Button variant='contained' startIcon={<DetailIcon/>} sx={{marginRightß:3}}>
                                                Details
                                            </Button>
                                            <Button variant='contained' startIcon={<ThumbUp/>}>
                                                Give Thumbs Up
                                            </Button>
                                        </Box>
                                       
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
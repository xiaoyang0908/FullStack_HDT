'use client'
import { ClickBack } from "@/app/components/clickBack"
import {Box, Button, Container,Typography,
     Grid, Paper,IconButton,Dialog,
     DialogContent,MenuItem,DemoItem,
    Table, TableBody, TableHead, TableContainer, TableCell, TableRow
    } from "@mui/material"
import HistoryIcon from "@mui/icons-material/HistoryRounded";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePatient } from "../../contexts/PatientContext";
import { tasksList } from "@/app/components/taskList";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import EditICon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { reqGame } from "@/app/api/api";


export default function ManageTask(){
    // get game list
    const [gameList, setGameList] = useState();
    useEffect(()=>{
        reqGame().then((res)=>{
            setGameList(res);
        })
    },[gameList])

    const [tasks, setTasks] = useState([]);
    const searchParams = useSearchParams();
    const currentPatient = JSON.parse(searchParams.get("patient"));
    // const {currentPatient} = usePatient()

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

    const [openDia,setOpenDia] = useState();
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    const [showTable, setShowTable] = useState("none");
   
    useEffect(()=>{
        const handleTableDispaly = () =>{
            if(tasksList.length>0){
                setShowTable("block");
            }
        }
        handleTableDispaly();
    },[showTable])

    const [taskInfo, setTaskInfo] = useState(
        {
            type:"",
            sets:"", 
            slot:"",
            date:"", 
            progress:"", 
            img:"",
            equip:"",
            level:""
        }
    );

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = (event) =>{
        event.preventDefault();
    //    post operation
        
        handleClose();

    }
    const handleAddTask = (task) =>{
        handleClickOpen();
        const difficultyLevel = ["easy","medium","hard"];
        const totalSets =[1,2,3,4,5,6];
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: () =>{onSubmit}
                }}
            >
                <DialogContent>
                    <Typography variant="h6" fontWeight={"bold"}>{task.type}</Typography>
                    <Typography variant="text">Equipment: {task.equip}</Typography>
                    <Typography variant="text" fontWeight={"bold"}>Time per set: {task.sets}</Typography>

                    <Box sx={{ display:"flex",justifyContent:"center", alignItems:"center"}}>
                        <form style={{width:"80%"}}>
                            <InputLabel htmlFor="outlined-select-Difficulty">Difficulty</InputLabel>
                            <TextField
                                id='outlined-select-Difficulty'
                                select
                                name="difficulty"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={taskInfo.level}
                                onChange = {handleChange}
                            >
                               {difficultyLevel.map((op) =>(
                                    <MenuItem key={op} value={op}>
                                        {op}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <InputLabel htmlFor="outlined-select-Sets">Password</InputLabel>
                            <TextField
                                id='outlined-select-Sets'
                                select
                                name="sets"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value ={taskInfo.sets}
                                onChange = {handleChange}
                            >
                                {totalSets.map((op) =>(
                                    <MenuItem key={op} value={op}>
                                        {op}
                                    </MenuItem>
                                ))}

                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateTimeRangePicker localeText={{ start: 'Start date', end: 'End date' }} />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Box sx={{display:"flex", width:"100%", justifyContent:"space-between"}}>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button variant="conatined" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    </Box>

                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Container  sx={{paddingTop: '6vh', minWidth: '100%', maxHeight: '100vh', overflow: 'hidden'}}>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                <ClickBack username={currentPatient?.name} pagename={"Manage Tasks"} path={"/manageTasks"}/>
                <Button variant="outlined" startIcon={<HistoryIcon/>} sx={{height:40}}>History</Button>
          </Box>
        <Box sx={{width:"100%",height:"60vh", marginTop:1}} >
         <TableContainer display={showTable}>
            <Table aria-label="task table" sx={{border:0}}>
                <TableHead >
                    <TableRow sx={{'&:first-child, &:last-child':{borderRadius:"8px 0px 8px 0px"}}}>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold",}} align="left">Game Name</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Equippments</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Difficulty</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Total Sets</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Time per Set</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Status</TableCell>
                            <TableCell sx={{color:"#2646A5", fontWeight:"bold"}} align="left">Task Period</TableCell>
                            <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tasksList.map((task,i)=>(
                        <TableRow key={i} sx={{'& > *': {border:0},}}>
                                <TableCell component="th" scope="row" align="left">{task.type}</TableCell>
                                <TableCell align="left">{task.equip}</TableCell>
                                <TableCell align="left">{task.level}</TableCell>
                                <TableCell align="left">{task.sets}</TableCell>
                                <TableCell align="left">{task.slot}</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">{task.date}</TableCell>  
                                <TableCell>
                                    <IconButton aria-label="edit">
                                        <EditICon color="#5A6ACF"/>
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon color="red"/>
                                    </IconButton>
                                </TableCell>                           
                        </TableRow>    
                    ))}
                </TableBody>
            </Table>
         </TableContainer>
         </Box>
          <Box  sx={{
                height:160,
                width:"100%",
                color: 'white',
                overflow:showList, 
      }}
          > 
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between",marginBottom:1, height:"50px"}}>
                <Typography variant="h6" color={"black"}>Add Tasks</Typography>
                <Button variant="contained" sx={{height:"35px"}} onClick={handleClickMore}> {buttonName} </Button>
            </Box>
           
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {gameList.map((v,i)=>(
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Paper sx={{display:"flex", overflow:"hidden", bgcolor:"#F9F9F9"}}>
                            <Box sx={{width:"90px", height:"100px",border:"1px solid grey"}}>
                            <img src={v.img} alt={v.type} loading="lazy"/>
                            </Box>
                            <Box sx={{paddingLeft:1}}>
                                <Typography variant="h6" fontWeight={"bold"}>{v.type}</Typography>
                                <Box sx={{display:"flex", marginTop:1}}>
                                    <Typography variant="text">Equipment: </Typography>
                                    <Typography variant="text" color={"#5A6ACF"} fontWeight={"bold"}>{v.equippment}</Typography>
                                </Box>
                                <Box sx={{display:"flex",marginTop:1}}>
                                    <Typography variant="text" fontWeight={"bold"}>Time per set: </Typography>
                                    <Typography variant="text" color={"#5A6ACF"} fontWeight={"bold"}> {v.slots} mins</Typography>
                                </Box>
                            </Box>
                            <IconButton onClick={handleAddTask}>
                                    <AddIcon sx={{color:"#5A6ACF", width:"30px", height:"30px"}}/>
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
    )
}
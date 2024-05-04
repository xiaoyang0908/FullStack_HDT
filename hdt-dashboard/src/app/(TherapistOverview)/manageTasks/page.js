'use client'
import { ClickBack } from "@/app/components/clickBack"
import {Box, Button, Container,Typography,
     Grid, Paper,IconButton,Dialog,
     DialogContent,MenuItem,DialogActions,
    Table, TableBody, TableHead, TableContainer, TableCell, TableRow, InputLabel,TextField
    } from "@mui/material"
import HistoryIcon from "@mui/icons-material/HistoryRounded";
import { Fragment, useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditICon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { reqDeleteTask, reqGame, reqTaskList} from "@/app/api/api";
import formatDate from "@/app/util/date";


export default function ManageTask(){
    const [currentPatient, setCurrentPatient] = useState({});
    const [tasks, setTasks] = useState([]);


    function sortPatientData(unsortedData, isAscending = true) {
        return [...unsortedData].sort((a, b) => {
            const nameA = a.status ? a.status.toUpperCase() : '';
            const nameB = b.status ? b.status.toUpperCase() : '';
            if (nameA < nameB) {
                return isAscending ? -1 : 1;
            }
            if (nameA > nameB) {
                return isAscending ? 1 : -1;
            }
            return 0;
        });
    }
    

        // Fetch patient data from localStorage
        useEffect(() => {
            const patientData = localStorage.getItem('currentPatient');
            if (patientData) {
                const parsedData = JSON.parse(patientData);
                setCurrentPatient(parsedData);
                const sortedData = sortPatientData(parsedData.tasks);
                setTasks(sortedData || []);
            }
        }, []);

    // Fetch game list
    const [gameList, setGameList] = useState([]);
    useEffect(() => {
        reqGame().then((res) => {
            setGameList(res);
        }).catch((error) => {
            console.log(error);
        });
    }, [currentPatient]);  // Depend on currentPatient to re-fetch when it changes


    //  set more button in case of more games
    const [open, setOpen] = useState(false);
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


    // encapsulate the taskinfo
    const [taskInfo, setTaskInfo] = useState(
        {
            game:{
                type:"",
                equippment:"",
                slots:"",
                img:""
            },
            difficulty:"",
            sets:"", 
            status:"Not Done",
            date:"", 
            
        }
    );
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [selectedStartDate, setSelectedSatrtDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [date,setDate] = useState({
                start:"",
                end:""

    });

    const handleDeleteTask = (id) =>{
        reqDeleteTask(currentPatient.patientID,id).then((res)=>{
            const sortesRes = sortPatientData(res);
            setTasks(sortesRes);
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleEditTask = (task) =>{
        setOpenDia(true);
        setTaskInfo(task);
    }

    // show dialog
    const [openDia,setOpenDia] = useState(false);
    const handleStartDate = (value) => {
        setSelectedSatrtDate(value);
        setDate((prev) => ({
            ...prev,
            start:formatDate(value), // toString
        }));
    };
    const handleEndDate = (value) => {
        setSelectedEndDate(value);
        setDate((prev) => ({
            ...prev,
            end: formatDate(value) // toString
        }));
    };

    const handleClickOpen = (task) => {
        console.log(task);
        setOpenDia(true);
        setTaskInfo((pre) =>({
            ...pre,
            game:{
                ...pre.game,
                type:task.type,
                equippment:task.equippment,
                slots:task.slots,
                img:task.img
            }
        }))
      };

     
    
    const handleClose = () => {
        setOpenDia(false);
    };

    useEffect(()=>{
        setTaskInfo((prev) =>({
            ...prev,
            date:`${date.start}-${date.end}`
        }))
    },[date])

    useEffect(()=>{
        window.dispatchEvent(new Event("resize"));
        handleAddTask(openDia,taskInfo);
        console.log(openDia,taskInfo);
    },[openDia,taskInfo])


    const onSubmit = (event) =>{
        event.preventDefault();
    //    post operation
        reqTaskList(currentPatient.patientID,taskInfo).then((res)=>{
            // console.log(res);
            if (res) {
                const sortesRes = sortPatientData(res);
                setTasks(sortesRes);
            } 
        }).catch((error)=>{
            console.log(error);
        })
        handleClose();
    }

    const handleAddTask = (openDia,taskInfo) =>{
        const difficultyLevel = ["Adaptive control","easy","medium","hard"];
        const totalSets =[1,2,3,4,5,6];
        return (
            <Dialog
            open={openDia}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmit
            }}
        >
            <DialogContent>
                <Box sx={{display:"flex", flexDirection:"column",marginBottom:2}}>
                        <Typography variant="h6" fontWeight={"bold"}>{taskInfo.game.type}</Typography>
                        <Typography variant="text">Equipment: {taskInfo.game.equippment}</Typography>
                        <Typography variant="text">Time per set: {taskInfo.game.slots} mins</Typography>
                </Box>
                <Box sx={{ display:"flex",flexDirection:"column"}}>
                        <InputLabel htmlFor="outlined-select-Difficulty">Difficulty</InputLabel>
                        <TextField
                            id='outlined-select-Difficulty'
                            select
                            name="difficulty"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={taskInfo.difficulty}
                            onChange = {handleChange}
                        >
                           {difficultyLevel.map((op) =>(
                                <MenuItem key={op} value={op}>
                                    {op}
                                </MenuItem>
                            ))}
                        </TextField>
                        <InputLabel htmlFor="outlined-select-Sets">Total Sets</InputLabel>
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
                            <DemoContainer components={['DatePicker','DatePicker']} sx={{display:"flex", alignItems:"center"}}>
                                <DatePicker slotProps={{
                                    textField: {
                                    helperText: 'MM/DD/YYYY',
                                    },
                                }}
                                label={'Start date'}  
                                disablePast 
                                value={selectedStartDate} 
                                onChange={(newValue)=>handleStartDate(newValue)}/> 
                                <Box sx={{width:"50px",height:"1px", bgcolor:"lightgray"}}></Box>
                                <DatePicker slotProps={{
                                    textField: {
                                    helperText: 'MM/DD/YYYY',
                                    },
                                }}
                                label={'End date'}  
                                disablePast 
                                value={selectedEndDate} 
                                onChange={(newValue)=>handleEndDate(newValue)}/> 
                            </DemoContainer>
                        </LocalizationProvider>

                        <DialogActions>
                            <Button variant="conatined" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                </Box>

            </DialogContent>
        </Dialog>
        )
    }

    return (
        <Container  sx={{paddingTop: '6vh', minWidth: '100%', maxHeight: '100vh', overflow: 'hidden'}}>
          <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",width:"100%"}}>
                <ClickBack username={currentPatient?.name} pagename={"Manage Tasks"} path={"/manageTasks"}/>
                {/* <Button variant="outlined" startIcon={<HistoryIcon/>} sx={{height:40}}>History</Button> */}
          </Box>
        <Box sx={{width:"100%",height:"60vh", marginTop:1,overflow:"auto"}} >
            {/* display={showTable} */}
            {
                tasks.length>0? 
                ( <TableContainer>
                    <Table aria-label="task table" sx={{border:0}}>
                        <TableHead >
                            <TableRow sx={{}}>
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
                            {tasks.map((task,i)=>(
                                <TableRow key={i} sx={{'& > *': {border:0, }}}>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} component="th" scope="row" align="left">{task.game.type}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.game.equippment}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.difficulty}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.sets}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.game.slots}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.status}</TableCell>
                                        <TableCell sx={{...((task.status === "Done" || task.status==="Not Done") && {color:"#A9A9A9"} )}} align="left">{task.date}</TableCell>  
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={()=>handleEditTask(task)} sx={{...((task.status === "Done" || task.status==="Not Done") && {display:"none"} )}}>
                                                <EditICon color="#5A6ACF"/>
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={()=>{handleDeleteTask(task._id)}} sx={{...((task.status === "Done" || task.status==="Not Done") && {display:"none"} )}}>
                                                <DeleteIcon color="red"/>
                                            </IconButton>
                                        </TableCell>                           
                                </TableRow>  
                            ))}
                        </TableBody>
                    </Table>
                 </TableContainer>):
                 (
                 <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center", width:"100%", height:"100%"}}>
                    <img src="/tasks/notask.svg" width="83px" height="83px"/>
                    <Typography fontSize="24px" color="#555555">There is no task, please add</Typography>
                 </Box>
                 )
            }
        
         </Box>
         {openDia && handleAddTask(openDia,taskInfo)}
          <Box  sx={{
                height:165,
                width:"100%",
                color: 'white',
                overflow:showList, 
                bgcolor:"#F2F3F8"
      }}
          > 
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between",marginBottom:1, height:"50px"}}>
                <Typography variant="h6" color={"black"}>Add Tasks</Typography>
                <Button variant="contained" sx={{height:"35px"}} onClick={handleClickMore}> {buttonName} </Button>
            </Box>
           
            <Grid container spacing={2} sx={{ flexGrow: 1}}>
                {gameList.map((v,i)=>(
                    <Grid item xs={4} sm={4} md={4} lg={4} key={i}>
                        <Paper sx={{display:"flex", overflow:"hidden", bgcolor:"#F9F9F9", p:0}}>
                            <Box sx={{width:"90px", height:"100px"}}>
                                <img src={v.img} alt={v.type} width="90px" height="100px" loading="lazy"/>
                            </Box>

                            <Box sx={{paddingLeft:1,paddingRight:2}}>
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

                            <IconButton onClick={()=>handleClickOpen(v)}>
                                    <AddIcon sx={{color:"#5A6ACF", width:"40px", height:"40px"}}/>
                            </IconButton>
                            
                        </Paper>
                    </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
    )
}
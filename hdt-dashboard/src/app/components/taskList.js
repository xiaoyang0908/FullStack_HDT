import { Grid, Paper,Box,Typography,Button, CardMedia, Card, CardHeader, IconButton, CardContent } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';;
export default function TasksComponent({taskList, showDate, layout}){


 function changeColor(task){
  let color = "white";
  if (task.difficulty === "easy") {
      color = "#26FF49";
    } else if (task.difficulty === "medium") {
      color = "#FFF969";
    } else if (task.difficulty === "hard") {
      color = "#FF4D26";
    } else if (task.difficulty === "Adaptive control") {
      color = "lightgrey";
    }
    return color;
  }


  return (
 
      <Grid container spacing={2} direction="row" sx={{ height: '100%' }}>
          {taskList.map((task) => (
              <Grid item xs={layout} key={task._id} sx={{ display: 'flex', position: 'relative',height: '100%' }}>
                  <Card sx={{ width: '100%', height: '100%'}}>
                      <CardMedia
                        sx={{height:"85%"}}
                        image = {task.game.img}
                      />
                      <CardContent sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",marginTop:2}}>
                        <Typography variant="text" display={showDate}>{task.date}</Typography>
                        <Box sx={{width:"100%",height:"10px"}}>
                          <LinearProgress variant="determinate" value={50} sx={{height:10,borderRadius: 5,}}/>
                        </Box>
                      </CardContent>
                  </Card>


                  <Card sx={{width: 'calc(100% - 16px)', height: '85%', position:"absolute",top:0, left:0,  backgroundColor: 'transparent' ,margin:2}}>
                        <CardHeader

                            action={
                              <img src={task.game.icon} width="50px" height="50px" />
                            }
                        />
                        <CardContent sx={{height:"40%",backgroundColor: 'rgba(255, 255, 255, 0)', display:"flex", flexDirection:"column", alignItems:"center"}}/>
                        
                          <CardContent sx={{marginTop:"auto", backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                            <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                              <Typography variant="h6" fontWeight="bold">{task.game.type} </Typography>
                              <Box sx={{height:"25px",backgroundColor:"black", borderRadius:20,marginLeft:1,paddingLeft:1,paddingRight:1,
                              color: changeColor(task)}}>
                                {task.difficulty}</Box>
                            </Box>
                            <Box sx={{display:"flex", marginTop:1,alignItems:"center"}}>
                              <Box sx={{height:"30px",backgroundColor:"black", borderRadius:20, color:"#FFF969",marginLeft:1,paddingLeft:1,paddingRight:1,display:"flex",alignItems:"center"}}>
                                {task.game.slots} mins x {task.sets}
                              </Box>
                            </Box>
                          </CardContent>
                      </Card>
              </Grid>
          ))}
      </Grid>
  )
}


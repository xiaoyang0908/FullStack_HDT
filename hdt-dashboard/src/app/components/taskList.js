import { Grid, Paper,Box,Typography,Button, CardMedia, Card, CardHeader, IconButton, CardContent,linearProgressClasses } from "@mui/material"
export default function TasksComponent({taskList, showDate}){


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
              <Grid item xs={3} key={task._id} sx={{ display: 'flex' }}>
                  <Card sx={{ width: '100%', height: '100%'}}>
                      <CardMedia
                        sx={{height:"80%"}}
                        image = {task.game.img}
                      />
                      <CardContent sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="text" display={showDate}>{task.date}</Typography>
                        {/* <linearProgressClasses sx={{ height:"8px",borderRadius:"4px",width:"100%",
                          ...(task.status === "Done" && {[`&.${linearProgressClasses.bar}`]:"#1EBEAD"}) 
                          || (task.status === "In Process" && {[`&.${linearProgressClasses.bar}`]:"#737BE5"}) 
                          || (task.status === "Awaiting Start" && {[`&.${linearProgressClasses.bar}`]:"#F3901C"})
                          || (task.status === "Not Done" && {[`&.${linearProgressClasses.bar}`]:"#F3901C"})}} variant="determinate" value={50} /> */}
                      </CardContent>
                  </Card>


                  <Card sx={{width: '100%', height: '80%', /*position:"absolute"*/top:0, left:0, backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                        <CardHeader
                            action={
                              <img src={task.game.icon} width="50px" height="50px" />
                            }
                        />
                        <CardContent />
                        
                          <CardContent sx={{marginTop:"auto", backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
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


import { Grid, Paper,Box,Typography,Button, CardMedia, Card, CardHeader, IconButton, CardContent,linearProgressClasses } from "@mui/material"
export default function TasksComponent({taskList, showDate}){

  return (
 
    <Box sx={{ overflow: 'auto', flexGrow: 1, height: '100%' }}>
      <Grid container spacing={2} direction="row" sx={{ height: '100%' }}>
          {taskList.map((task) => (
              <Grid item xs={4} key={item} sx={{ display: 'flex' }}>
                  <Card sx={{ width: '100%', height: '100%', position:"relative"}}>
                      <CardMedia
                        sx={{height:"100%"}}
                        image = {task.game.img}
                      />
                      <CardContent sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="text" display={showDate}>{task.date}</Typography>
                        <linearProgressClasses sx={{ height:"8px",borderRadius:"4px",width:"100%",
                          ...(task.status === "Done" && {[`&.${linearProgressClasses.bar}`]:"#1EBEAD"}) 
                          || (task.status === "In Process" && {[`&.${linearProgressClasses.bar}`]:"#737BE5"}) 
                          || (task.status === "Awaiting Start" && {[`&.${linearProgressClasses.bar}`]:"#F3901C"})
                          || (task.status === "Not Done" && {[`&.${linearProgressClasses.bar}`]:"#F3901C"})}} />
                      </CardContent>
                  </Card>
                  <Card sx={{width: '100%', height: '80%', position:"absoulute", top:0, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <CardHeader
                        action={
                          <img src={task.game.icon} width="50px" height="50px" />
                        }
                    />
                    <CardContent />
                    
                    <CardContent sx={{marginTop:"auto", backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                        <Box sx={{display:"flex", marginTop:1, alignItems:"center"}}>
                          <Typography variant="h6" fontWeight="bold">{task.game.type} </Typography>
                          <Box sx={{height:"20px",backgroundColor:"black", borderRadius:20,
                           ...(task.difficulty==="easy"&&{color:"#26FF49"})
                           ||(task.difficulty==="medium"&&{color:"#FFF969"})
                           ||(task.difficulty==="hard"&&{color:"#FF4D26"})
                           ||(task.difficulty==="Adaptive control"&&{color:"lightgrey"})}}>
                            {task.difficulty}</Box>
                        </Box>
                        <Box sx={{display:"flex", marginTop:1,alignItems:"center",justifyContent:"center"}}>
                          <Box sx={{height:"25px",backgroundColor:"black", borderRadius:20, color:"#FFF969"}}>
                            <img src="/tasks/coin.svg" width="24px" height="24px"/>
                           {task.coins}
                          </Box>
                          <Box sx={{height:"25px",backgroundColor:"black", borderRadius:20, color:"#FFF969"}}>
                            {task.game.slots} mins x {task.sets}
                          </Box>
                        </Box>
                      </CardContent>
                  </Card>
              </Grid>
          ))}
      </Grid>
  </Box>
  )
}


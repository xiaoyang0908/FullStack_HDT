import { Grid, Card, CardMedia, CardContent, Typography, Box, LinearProgress, Popover } from '@mui/material';
import { useState } from 'react';

export default function TasksComponent({ taskList, showDate, layout,gridHeight,parent }) {

  function changeColor(task) {
    switch (task.difficulty) {
      case "easy": return "#26FF49";
      case "medium": return "#FFF969";
      case "hard": return "#FF4D26";
      case "Adaptive control": return "lightgrey";
      default: return "white";
    }
  }

  const [anchorElMap, setAnchorElMap] = useState({});

  const handleMouseEnter = (event, task) => {
      const newAnchorElMap = { ...anchorElMap, [task._id]: event.currentTarget };
      setAnchorElMap(newAnchorElMap);
  };


  const handleMouseLeave = () => {
      setAnchorElMap({});
  };

  const openPopover = (taskId) => {
      return Boolean(anchorElMap[taskId]);
  };

  return (
    <Grid container spacing={3} direction="row" sx={{ height: gridHeight }}>
      {
        parent==="3rd"?
        (
          taskList.map((task) => (
            <Grid item xs={layout} key={task._id} sx={{ display: 'flex', position: 'relative', height: '100%',boxShadow: 'none'}}>
              <Card sx={{ width: '100%', height: '100%', backgroundColor: 'transparent', boxShadow: 'none', position: 'relative', overflow: 'visible', cursor: 'pointer' }} 
                onMouseEnter={(event) => handleMouseEnter(event, task)}
                onMouseLeave={handleMouseLeave}
                aria-owns={open ? task._id : undefined}
                aria-haspopup="true"
                >
                <CardMedia
                  component="img"
                  sx={{ height: "90%", width: "100%"}}
                  image={task.game.img}
                  alt="Game visual"
                />
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                  <img src={task.game.icon} width="100%" height="100%" alt="Game icon" />
                </Box>
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
                  <Typography variant="body2" paddingBottom={1} display={showDate}>{task.date}</Typography>
                  <Box sx={{ width: "100%", height: "10px" }}>
                    <LinearProgress variant="determinate" value={(task.finisheSets/task.sets)* 100} sx={{ height: 10, borderRadius: 5, backgroundColor: '#DFDFDF' }} />
                  </Box>
                </CardContent>
    
                <CardContent sx={{
                  width: '100%',
                  height: 'auto',
                  position: "absolute",
                  //should use vh instead? not good in large screen
                  bottom: (showDate === "none") ? '10%' : '15%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  padding: 2
                }}>
    
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" fontWeight="bold">{task.game.type}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1 }}>
                    <Box sx={{
                      height: "30px", backgroundColor: "black", borderRadius: 20, color: "#FFF969", paddingX: 1, display: "flex", alignItems: "center"
                    }}>
                      {task.game.slots} mins x {task.sets} 
                    </Box>
                    <Box sx={{
                      height: "30px", backgroundColor: "black", borderRadius: 20, paddingX: 1, display: "flex", alignItems: "center",
                      color: changeColor(task)
                    }}>
                      {task.difficulty}
                    </Box>
                  </Box>
                </CardContent>
              </Card>


              <Popover 
                  id={task._id}
                  open={openPopover(task._id)}
                  anchorEl={anchorElMap[task._id]}
                  // anchorReference="anchorPosition"
                  // anchorPosition={{ top: "50vh", left: "20vw"}}
                  onClose={handleMouseLeave}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                  }}
                  sx={{pointerEvents: 'none'}}
                  disableRestoreFocus
                >
                   {task.game.video===""? 
                     (
                      <Typography variant='h5' sx={{p:1}}>No video available</Typography>
                      ):(
                    <video
                            width="500px"
                            height="300px"
                            autoPlay
                            muted
                            loop
                        >

                            <source src={task.game.video} type="video/mp4" />
                      </video>
                   )}
              </Popover>
            </Grid>
          ))
        ):
        (
          taskList.map((task) => (
            <Grid item xs={layout} key={task._id} sx={{ display: 'flex', position: 'relative', height: '100%',boxShadow: 'none'}}>
              <Card sx={{ width: '100%', height: '100%', backgroundColor: 'transparent', boxShadow: 'none', position: 'relative', overflow: 'visible' }}>
                <CardMedia
                  component="img"
                  sx={{ height: "85%", width: "100%"}}
                  image={task.game.img}
                  alt="Game visual"
                />
                <Box sx={{ position: 'absolute', top: 10, right: -10 }}>
                  <img src={task.game.icon} width="60%" height="60%" alt="Game icon" />
                </Box>
                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
                  <Typography variant="body2" paddingBottom={1} display={showDate}>{task.date}</Typography>
                  <Box sx={{ width: "100%", height: "8%" }}>
                    <LinearProgress variant="determinate" value={(task.finisheSets/task.sets)* 100} sx={{ height: 8, borderRadius: 5, backgroundColor: '#DFDFDF' }} />
                  </Box>
                </CardContent>
    
                <CardContent sx={{
                  width: '100%',
                  height: 'auto',
                  position: "absolute",
                  //should use vh instead? not good in large screen
                  bottom: (showDate === "none") ? '15%' : '20%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  padding: 1,
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between"
                }}>
    
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h7" fontWeight="bold">{task.game.type}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Box sx={{
                      height: "100%", backgroundColor: "black", borderRadius: "20px", color: "#FFF969", paddingX: 1, display: "flex", alignItems: "center"
                    }}>
                      <Typography fontSize={14}> x {task.sets} </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )
      }
    </Grid>
  );
}

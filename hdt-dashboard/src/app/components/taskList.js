import { Grid, Card, CardMedia, CardContent, Typography, Box, LinearProgress } from '@mui/material';

export default function TasksComponent({ taskList, showDate, layout }) {

  function changeColor(task) {
    switch (task.difficulty) {
      case "easy": return "#26FF49";
      case "medium": return "#FFF969";
      case "hard": return "#FF4D26";
      case "Adaptive control": return "lightgrey";
      default: return "white";
    }
  }

  return (
    <Grid container spacing={3} direction="row" sx={{ height: '95%' }}>
      {taskList.map((task) => (
        <Grid item xs={layout} key={task._id} sx={{ display: 'flex', position: 'relative', height: '100%' }}>
          <Card sx={{ width: '100%', height: '100%', backgroundColor: 'transparent', boxShadow: 'none', position: 'relative', overflow: 'visible' }}>
            <CardMedia
              component="img"
              sx={{ height: "90%", width: "100%"}}
              image={task.game.img}
              alt="Game visual"
            />
            <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
              <img src={task.game.icon} width="50px" height="50px" alt="Game icon" />
            </Box>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: 'transparent' }}>
              <Typography variant="body2" paddingBottom={1} display={showDate}>{task.date}</Typography>
              <Box sx={{ width: "100%", height: "10px" }}>
                <LinearProgress variant="determinate" value={50} sx={{ height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.2)' }} />
              </Box>
            </CardContent>

            <CardContent sx={{
              width: '100%',
              height: 'auto',
              position: "absolute",
              bottom: (showDate === "none") ? '30px' : '60px',
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
        </Grid>
      ))}
    </Grid>
  );
}

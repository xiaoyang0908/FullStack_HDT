// import { ClickBack } from "@/app/components/clickBack";
// import {Grid, Box, Divider, Typography,Button, IconButton} from "@mui/icons-material";
// import { UndoOutlined } from "@mui/icons-material";

// export default function Archived(){
//     const [page, setPage] = useState(1);
//     const handleChangePatientListPage = (event, newPage) => {
//         setPage(newPage);
//     };
    
//     return(
//         <Box>
//         <ClickBack/>
//          <Grid container spacing={2} sx={{ overflow: 'auto', mb: 'auto', width: "100%" }}>
//          {filteredPatientsList
//              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
//              .map((patient) => (
//                  <Grid item key={patient.patientID} xs={12}>
//                      <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: 2, maxWidth: '30%' }}>
//                              <Avatar sx={{ marginRight: 2 }}>{/* Patient's Avatar */}</Avatar>
//                             <Typography variant="h6">{patient.name || 'No data available'}</Typography>
//                          </Box>

//                          <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

//                          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: 2, padding: 2, maxWidth: '30%' }}>
//                              <Typography variant="body2">ID: {'No data available'}</Typography>
//                          </Box>

//                          <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

//                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, maxWidth: '40%' }}>
//                              <Button startIcon={<UndoOutlined/>}>
//                                     unarchive
//                              </Button>
//                          </Box>
//                      </Card>
//                  </Grid>
//              ))}
//      </Grid>
//      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', p: 6 }}>
//         <Pagination
//             page={page}
//             count={count}
//             onChange={handleChangePatientListPage}
//             size="large"
//         />
//     </Box>
//      </Box>
//     )
// }
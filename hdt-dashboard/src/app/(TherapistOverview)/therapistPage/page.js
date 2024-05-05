'use client'
import SearchIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from '@mui/material/InputAdornment';
import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp from '@mui/icons-material/ThumbUpAltOutlined';
import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import { useRouter } from 'next/navigation';
import ManageTasksIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
// import {updateCurrentPatient} from "../../contexts/PatientContext";
import { reqActivePatientsList, reqUpdateThumbs } from '../../api/api';
import { usePatient } from '../../contexts/PatientContext';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import {
  TextField, 
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Container,
  Pagination,
  Divider
} from "@mui/material";


export default function TherapistOverview() {
    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [isAscending, setIsAscending] = useState(true);
    const gridAndSearchBarWidth = '100%';
    const [searchQuery, setSearchQuery] = useState('');
    const dividerPadding = 2;
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const router = useRouter();
    // const { updateCurrentPatient } = usePatient();
    const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
    const therapistInfo = cookies.user_token;

    const detailsButtonPath = '/patientsDetails';
    const manageTaskButtonPath = '/manageTasks';
    const addClientButtonPath = '/createPatientPage';
    const archivedClientsButtonPath = '/archivedPatientPage';
    
     // Fetch patients
     const fetchPatients = async () => {
        setLoading(true);
        try {
            const response = await reqActivePatientsList(therapistInfo.email);
            console.log(response)
            setPatientsList(response);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch patients:", error);
            setError('Failed to fetch patients');
            setLoading(false);
        }
    };
    useEffect(() => {  
        fetchPatients();
    }, []);

    useEffect(() => {   // Prevent scrolling 
        document.body.style.overflow = 'hidden';
    
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {   // Sort patients by name
        setPatientsList(patientsList => [...patientsList].sort((a, b) => {
            const nameA = a.name ? a.name.toUpperCase() : '';
            const nameB = b.name ? b.name.toUpperCase() : '';
            if (nameA < nameB) {
                return isAscending ? -1 : 1;
            }
            if (nameA > nameB) {
                return isAscending ? 1 : -1;
            }
            return 0;
        }));
    }, [isAscending]);

    useEffect(() => {   // Update number of rows based on window height to prevent scrolling
        const calculateRows = () => {
          const rowHeight = 170;
          const otherElementsHeight = 20; 

          const availableHeight = window.innerHeight - otherElementsHeight;
          const rows = Math.floor(availableHeight / rowHeight);

          setRowsPerPage(rows > 0 ? rows : 1);
        };
      
        window.addEventListener('resize', calculateRows);
        calculateRows(); // Calculate initial number of rows
      
        return () => {
          window.removeEventListener('resize', calculateRows);
        };
      }, []);

    const handleChangePatientListPage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSort = () => {
        setIsAscending(!isAscending);
    };

    const handleButtonClick = (path, patientData) => {
        try {
            if (path === addClientButtonPath) {     // Clear any existing patient data from localStorage when adding a new patient
                localStorage.removeItem('currentPatient');
            } else if (patientData) {
                localStorage.setItem('currentPatient', JSON.stringify(patientData));    // Save patient data to local storage for other scenarios
            }
            router.push(path);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredPatientsList = searchQuery    // Filter patients by name
        ? patientsList.filter(patient =>
            patient.name && patient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : patientsList;

    let count = Math.ceil(filteredPatientsList.length / rowsPerPage);

    const handleClickThumbsUp = async (patient) => {
        const updatedPatientsList = patientsList.map((p) => {
            if (p.patientID === patient.patientID) {
                return { ...p, thumbs: p.thumbs + 1 };
            } else {
                return p;
            }
        });
        setPatientsList(updatedPatientsList);
    
        // Update the database in the background
        try {
            const res = await reqUpdateThumbs(patient.patientID);
            if (res === patient.thumbs + 1) {
                console.log("updating in database");
            } else {
                console.log("fail in updating in database");
            }
        } catch (error) {
            console.error("Failed to update database:", error);
            // If the database update fails, revert the frontend update
            const revertedPatientsList = patientsList.map((p) => {
                if (p.patientID === patient.patientID) {
                    return { ...p, thumbs: p.thumbs - 1 };
                } else {
                    return p;
                }
            });
            setPatientsList(revertedPatientsList);
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', height: '100vh', minWidth:"100%", paddingTop:"6vh"}}>

            {/* Search Grid */}
            <Grid container spacing={2} sx={{ mb: 2, width: gridAndSearchBarWidth }}>
                <Grid item xs={12} sx={{border:"none"}}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a name to search"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon sx={{color:"#5A6ACF"}}/>
                                </InputAdornment>
                              ),
                            type: 'search',
                            sx:{
                                bgcolor:"white",
                                border:"none"
                            }
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom:2, paddingRight:2}}>
                {/* Left section for sort button */}
                <Button
                    variant="outlined"
                    startIcon={<SortIcon />}
                    sx={{ mr: 1 }}
                    onClick={handleSort}
                >
                    {isAscending ? 'Name: A - Z' : 'Name: Z - A'}
                </Button>

                {/* Right section for client buttons */}
                <Box>
                    <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    sx={{ mr: 1 }}
                    onClick={() => handleButtonClick(addClientButtonPath)}
                    >
                        New Student
                    </Button>
                    {/* <Button 
                    variant="outlined" 
                    startIcon={<ArchivedIcon />}
                    onClick={() => handleButtonClick(archivedClientsButtonPath)}
                    >
                        Archived Clients
                    </Button> */}
                </Box>
            </Box>

            {/* User grid */}
            <Grid container spacing={2} sx={{ overflow: 'auto', mb: 'auto', width: gridAndSearchBarWidth }}>
                {filteredPatientsList
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((patient) => (
                        <Grid item key={patient.patientID} xs={12}>
                            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: 2, maxWidth: '30%' }}>
                                    <Avatar alt="Profile Picture" src={patient.photo || "/path/to/default/avatar.jpg"} sx={{ marginRight: 2 }} />
                                    <Box sx={{ flexDirection: 'column' }}>
                                        <Typography variant="h6">{patient.name || 'No data available'}</Typography>
                                        <Typography variant="body2">Current tasks: {patient.tasks? patient.tasks.length :'No data available'}</Typography>
                                    </Box>
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: 2, padding: 2, maxWidth: '30%' }}>
                                    <Typography variant="body2">Total exercise hours: {'No data available yet'}</Typography>
                                    <Typography variant="body2">This week: {patient.exerciseTimeCurrentWeek || 'No data available yet'}</Typography>
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, padding: 3, maxWidth: '40%', marginRight: 3 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DetailIcon />}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleButtonClick(detailsButtonPath, patient)}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ManageTasksIcon />}
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleButtonClick(manageTaskButtonPath, patient)}
                                    >
                                        Manage tasks
                                    </Button>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton aria-label="thumbs up" size="medium" onClick={() => handleClickThumbsUp(patient)}>
                                            <ThumbUp />
                                        </IconButton>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '50px', justifyContent: 'center' }}> {/* Adjusted container */}
                                            <Typography variant="h5">{patient.thumbs}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', p: 6 }}>
                <Pagination
                    page={page}
                    count={count}
                    onChange={handleChangePatientListPage}
                    size="large"
                />
            </Box>
        </Container>
    );
}
'use client'
import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp from '@mui/icons-material/ThumbUpAltOutlined';
import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import { useRouter } from 'next/navigation';
import ManageTasksIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { reqPatientsList } from '../../api/api';
import { useEffect, useState } from 'react';
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

    const detailsButtonPath = '/patientsDetails';
    const manageTaskButtonPath = '';
    const addClientButtonPath = '';
    const archivedClientsButtonPath = '';
    
    useEffect(() => {   // Fetch patients
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const response = await reqPatientsList();
                setPatientsList(response);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch patients:", error);
                setError('Failed to fetch patients');
                setLoading(false);
            }
        };

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

    const handleButtonClick = (path) => {   // Redirect to different page
        router.push(path);
        };

    const filteredPatientsList = searchQuery    // Filter patients by name
        ? patientsList.filter(patient =>
            patient.name && patient.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : patientsList;

    let count = Math.ceil(filteredPatientsList.length / rowsPerPage);

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: '60px' }}>

            {/* Search Grid */}
            <Grid container spacing={2} sx={{ mb: 2, width: gridAndSearchBarWidth }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Type a name to search"
                        InputProps={{
                            type: 'search',
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
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
                        Add client
                    </Button>
                    <Button 
                    variant="outlined" 
                    startIcon={<ArchivedIcon />}
                    onClick={() => handleButtonClick(archivedClientsButtonPath)}
                    >
                        Archived Clients
                    </Button>
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
                                    <Avatar sx={{ marginRight: 2 }}>{/* Patient's Avatar */}</Avatar>
                                    <Box sx={{ flexDirection: 'column' }}>
                                        <Typography variant="h6">{patient.name || 'No data available'}</Typography>
                                        <Typography variant="body2">Current tasks: {patient.currentTasks || 'No data available'}</Typography>
                                    </Box>
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

                                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', gap: 2, padding: 2, maxWidth: '30%' }}>
                                    <Typography variant="body2">Total exercise: {patient.exerciseTime || 'No data available'}</Typography>
                                    <Typography variant="body2">This week: {patient.exerciseTimeCurrentWeek || 'No data available'}</Typography>
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ my: dividerPadding }}/>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, maxWidth: '40%' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DetailIcon />}
                                        size="large"
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleButtonClick(detailsButtonPath)}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ManageTasksIcon />}
                                        size="large"
                                        sx={{ textTransform: 'none' }}
                                        onClick={() => handleButtonClick(manageTaskButtonPath)}
                                    >
                                        Manage tasks
                                    </Button>
                                    <IconButton aria-label="thumbs up" size="large">
                                        <ThumbUp />
                                    </IconButton>
                                    <IconButton aria-label="archive" size="large" sx={{ mr: 2 }}>
                                        <ArchivedIcon />
                                    </IconButton>
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
'use client'
import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp from '@mui/icons-material/ThumbUpAltOutlined';
import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import DetailsIcon from '@mui/icons-material/Details';
import ManageTasksIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { reqPatientsList } from '../../../api/api';
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
  Pagination
} from "@mui/material";
import { useEffect, useState } from 'react';
export default function TherapistOverview() {
    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    

    useEffect(() => {
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let count = Math.ceil(patientsList.length / rowsPerPage);

    return (
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

            {/* Search Grid */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Type a name to search"
                        InputProps={{
                            type: 'search',
                            endAdornment: (
                                <IconButton>
                                    <SortIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                {/* Left section for sort button */}
                <Button
                    variant="outlined"
                    startIcon={<SortIcon />}
                    sx={{ mr: 1 }}
                >
                    Name A - Z
                </Button>

                {/* Right section for client buttons */}
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }}>
                        Add client
                    </Button>
                    <Button variant="outlined" startIcon={<ArchivedIcon />}>
                        Archived Clients
                    </Button>
                </Box>
            </Box>

            {/* User grid */}
            <Grid container spacing={2} sx={{ overflow: 'auto', mb: 'auto' }}>
                {patientsList
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((patient) => (
                        <Grid item key={patient.patientID} xs={12}>
                            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, padding: 2 }}>
                                    <Avatar sx={{ marginRight: 2 }}>{/* Patient's Avatar */}</Avatar>
                                    <Box>
                                        <Typography variant="h6">{patient.name}</Typography>
                                        <Typography variant="body2">Current tasks: {patient.currentTasks}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', pr: 2 }}>
                                    <IconButton>
                                        <DetailIcon />
                                    </IconButton>
                                    <IconButton>
                                        <PlaylistAddCheckIcon />
                                    </IconButton>
                                    <IconButton>
                                        <ThumbUp />
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
                    onChange={handleChangePage}
                    size="large"
                />
            </Box>
        </Container>
    );
}
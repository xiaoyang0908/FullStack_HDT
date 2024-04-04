'use client'
import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp  from '@mui/icons-material/ThumbUpAltOutlined';
import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import { reqPatientsList } from '../../../api/api';
import {TextField, Box,Avatar, Button, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Container, TableFooter, TablePagination, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from 'react';

export default function TherapistOverview() {
    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;
    

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

    return(
        <Container maxWidth="none">
            <TextField
                sx={{width:"80vw", backgroundColor:"white", borderRadius:2}}
                label="Search input"
                InputProps={{
                type: 'search',
                }}
            />
            <Box sx={{display:"flex", width:"80vw", justifyContent:"space-between", marginTop:3}}>
                <Box>
                    <Button variant='contained' startIcon={<AddIcon/>} sx={{marginRight:1}}>
                        Add Client
                    </Button>

                    <Button variant='outlined' startIcon={<ArchivedIcon/>}>
                        Archived Clients
                    </Button>
                </Box>

            </Box>

            <TableContainer sx={{ width: "80vw", marginTop: 2 }}>
                <Table >
                    <TableBody>
                        {patientsList
                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                            .map((patient, index) => (
                                <TableRow key={patient.patientID || index}>
                                    <TableCell>{patient.patientID}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", width: "80vw", justifyContent: "center", marginTop: 3 }}>
                <Pagination
                    defaultPage={1}
                    page={page}
                    count={count}
                    onChange={handleChangePage}
                    size='large' />
            </Box>
        </Container>
    );
}
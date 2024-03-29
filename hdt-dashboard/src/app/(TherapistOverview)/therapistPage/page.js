'use client'
import SortIcon from '@mui/icons-material/SortOutlined';
import AddIcon from '@mui/icons-material/AddCommentOutlined';
import DetailIcon from '@mui/icons-material/DocumentScannerOutlined';
import ThumbUp  from '@mui/icons-material/ThumbUpAltOutlined';
import ArchivedIcon from '@mui/icons-material/ArchiveOutlined';
import { patientsList } from '@/components/patientsList';
import {TextField, Box,Avatar, Button, Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Container, TableFooter, TablePagination, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from 'react';

export default function TherapistOverview(){
    const[sortedData, setSortedData] = useState(patientsList);
    const[sort, setSort] = useState(true);
    // sort list
    // 
    // x.localeCompare(y,'fr',{ignorePunctuation:true})
    function Comparator(a,b){
        return a.name.localeCompare(b.name);
    }
    function SortList(dataList){
        let sortDataList = dataList.slice().sort(Comparator);
        return sortDataList;
    }

    const handleSortClick = () =>{
        if(sort){
            setSortedData(SortList(sortedData));
        }else{
            setSortedData(patientsList);
        }
        setSort(!sort);
    }

    // set pagination
    const rowsPerPage = 5;

    let count = Math.ceil(patientsList.length / rowsPerPage);;
    const [page,setPage] = useState(1);
   
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };


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
                <Button variant="outlined" endIcon={<SortIcon/>} onClick={handleSortClick}>
                    Name A-z
                </Button>
                <Box>
                    <Button variant='contained' startIcon={<AddIcon/>} sx={{marginRight:1}}>
                        Add Client
                    </Button>

                    <Button variant='outlined' startIcon={<ArchivedIcon/>}>
                        Archived Clients
                    </Button>
                </Box>
               
            </Box>
                        
            <TableContainer  sx={{width:"80vw",marginTop:2}}>
                <Table >
                    <TableBody>
                        {(sortedData.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)).map((row)=>(
                            <TableRow key={row.name}>
                                <TableCell component="th" scope='row' >
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", height:100,bgcolor:"white", borderRadius:2}}>
                                        <Box sx={{display:"flex",alignItems:"center",marginLeft:2, height:100, width:300,}}>
                                            <Avatar alt="Remy Sharp"
                                                src=""
                                                sx={{ width: 70, height: 70, border:"1px solid black", marginRight:1 }} />
                                            <Box>
                                            <p>{row.name}</p>
                                            <p>Current tasks: {row.totalTask} ({row.currentTask}/{row.totalTask})</p>
                                            </Box>
                                           
                                        </Box>

                                        <Box>
                                            <p>Total exercise: {row.exerciseHour}h</p>
                                            <p>This week: {row.weekHour}h</p>
                                        </Box>
                                        <Box sx={{marginRight:2}}>
                                            <Button variant='contained' startIcon={<DetailIcon/>} sx={{marginRight:3}}>
                                                Details
                                            </Button>
                                            <Button variant='contained' startIcon={<ThumbUp/>}>
                                                Give Thumbs Up
                                            </Button>
                                        </Box>
                                       
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display:"flex", width:"80vw", justifyContent:"center", marginTop:3}}> 
                <Pagination 
                defaultPage={1}
                page={page}
                count={count}
                onChange={handleChangePage} 
                size='large'/> 
            </Box>
        </Container>
    )
}
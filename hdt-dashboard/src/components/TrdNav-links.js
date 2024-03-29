'use client'
import { useState } from 'react'
import {TrdPartyMainMenu} from './menuList'
import Button from '@mui/material/Button';
import {  ListItemIcon,Link, Avatar, Toolbar, Box} from '@mui/material';


export default function TrdNavBar(){
    
    const drawerWidth = 240;
   
    return (
        <Box sx={{height:"100vh",width:drawerWidth, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Toolbar sx={{ height:"30vh",
                display:"flex",
                flexDirection:"column",
                alignItems: 'center',
                justifyContent:"center"}}>
                <h3>welcome back</h3>
                <Avatar alt="Remy Sharp"
                        src=""
                        sx={{ width: 100, height: 100, border:"1px solid black" }} />
                <h4>click to edit your avatar</h4>
            </Toolbar>
            {/* <Divider  sx={{height: 20}} /> */}
            <Box  
                sx={{ display: 'flex',
                flexDirection: 'column',height:"65vh",border:"none}"}}>
                {TrdPartyMainMenu.map((v,i)=>(
                    <Button key={v.key} component={Link} href={v.key} variant="contained" sx={{height:70, width:200, fontSize:23, justifyContent:"center"}}>
                        <ListItemIcon sx={{width:50, height:50, alignItems:"center"}}>
                            {v.icon}
                        </ListItemIcon>
                        {v.title}
                    </Button>
                ))}
            </Box>
            
        </Box>
       
    )
}
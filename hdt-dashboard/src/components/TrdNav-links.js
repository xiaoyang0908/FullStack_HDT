'use client'
import { useState } from 'react'
import {TrdPartyMainMenu} from './menuList'
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { MenuItem, ListItemIcon, ListItemText, MenuList,ListItemButton,Link, Avatar, Toolbar, Box } from '@mui/material';


export default function TrdNavBar(){
    
    const drawerWidth = 240;
   
    return (
        <Box sx={{height:"100vh",width:drawerWidth}}>
            <Toolbar sx={{ height:150,
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
            <MenuList sx={{marginTop:2, justifyContent:"center"}}>
            {TrdPartyMainMenu.map((v,i)=>(
                <MenuItem key={v.key} sx={{width:"240px", height:"50px"}} component={Link} 
                href={v.key}>
                        <ListItemButton variant="contained" >
                            <ListItemIcon>
                                {v.icon}
                            </ListItemIcon>
                            <ListItemText primary={v.title}/>
                        </ListItemButton>
                </MenuItem>
            ))}
            </MenuList>
            
        </Box>
       
    )
}
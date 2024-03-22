'use client'
import { useState , useEffect} from 'react'
import {mainListItems} from './menuList'
import IconButton from '@mui/material/IconButton';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { MenuItem, ListItemIcon, ListItemText, MenuList,ListItemButton,Link, Avatar } from '@mui/material';


export default function NavBar(){
    
    const drawerWidth = 200;
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleMenuItemClick = (event,index) => {
        setSelectedIndex(index);
        
      };
    return (
        <Drawer variant="permanent" anchor='left' sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            }}}>
            <Toolbar sx={{ height:"30vh",
                display:"flex",
                flexDirection:"column",
                alignItems: 'center',
                justifyContent:"center"}}>
                <Avatar alt="Remy Sharp"
                        src=""
                        sx={{ width: 100, height: 100, border:"1px solid black" }} />
                <h4>Hi!</h4>
                <h4>Dr.Emily Johnson</h4>
            </Toolbar>
            <Divider />
            <MenuList>
            {mainListItems.map((v,i)=>(
                <MenuItem selected={i === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, i)} key={v.key} 
                component={Link} 
                href={v.key}>
                        <ListItemButton>
                        <ListItemIcon>
                            {v.icon}
                        </ListItemIcon>
                        <ListItemText primary={v.title}/>
                        </ListItemButton>
                </MenuItem>
            ))}
            </MenuList>
            
        </Drawer>
       
    )
}
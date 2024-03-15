'use client'
import { useState , useEffect} from 'react'
import {mainListItems} from './menuList'
import IconButton from '@mui/material/IconButton';
import MenuOutlined from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { MenuItem, ListItemIcon, ListItemText, MenuList,ListItemButton,Link } from '@mui/material';


export default function NavBar(){
    
    const drawerWidth = 240;
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
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
                }}
            >   
                <h3>HDT</h3>
                <IconButton>
                    <MenuOutlined />
                </IconButton>
            </Toolbar>
            <Divider />
            <MenuList>
            {mainListItems.map((v,i)=>(
                <MenuItem selected={i === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, i)} >
                    <Link href={v.key} 
                         sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'none' },underline:"none",color:"inherit"  }}
                         >
                        <ListItemButton>
                        <ListItemIcon>
                            {v.icon}
                        </ListItemIcon>
                        <ListItemText primary={v.title}/>
                        </ListItemButton>
                    </Link>
                </MenuItem>
            ))}
            </MenuList>
            
        </Drawer>
       
    )
}
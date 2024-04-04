'use client'
import { useState , useEffect} from 'react'
import {mainListItems} from './menuList'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItemIcon, ListItemText, MenuList, ListItemButton,Link, Avatar, Box , MenuItem, AppBar, IconButton} from '@mui/material';


export default function NavBar(){
    
    const drawerWidth = 200;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fontColor, setFont] = useState("black");
    const [bgcolor, setBgColor] = useState("white")


    const handleMenuItemClick = (event,index) => {
        setSelectedIndex(index);
        setFont("white")
        setBgColor("#3B3F73")
      };

    return (
        <Drawer variant="permanent" anchor='left' sx={{
            width: drawerWidth,
            bgcolor: "#F5F7FC",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            }
        }}>
            <Toolbar sx={{
                height: "30vh",
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: "center"
            }}>
                <Avatar alt="Remy Sharp"
                    src=""
                    sx={{ width: 100, height: 100, border: "1px solid black" }} />
                <h4>Hi!</h4>
                <h4>Dr.Emily Johnson</h4>
                <p>ID:</p>
            </Toolbar>
            <Divider />
            <Box sx={{ width: "200px", }}>
                <Box sx={{ height: "50px", alignItems: "center", display: "flex", marginLeft: 1 }}>
                    <p>Dashboard</p>
                </Box>
                <MenuList sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    {mainListItems.map((v, i) => (
                        <MenuItem selected={i === selectedIndex} sx={{
                            '.&Mui-selected': {
                                bgcolor: "none"
                            }
                        }}
                            onClick={(event) => handleMenuItemClick(event, i)} key={v.key}
                            component={Link}
                            href={v.key}>
                            <Button variant='contained' sx={{ width: "160px", height: "50px", bgcolor: bgcolor, color: fontColor }}>
                                <ListItemIcon>
                                    {v.icon}
                                </ListItemIcon>
                                {v.title}
                            </Button>
                        </MenuItem>
                    ))}
                </MenuList>
            </Box>
        </Drawer>
    );
}
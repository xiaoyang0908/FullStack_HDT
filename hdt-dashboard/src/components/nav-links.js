'use client'
import { useState , useEffect} from 'react'
import {mainListItems} from './menuList'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, ListItemIcon, ListItemText, MenuList, ListItemButton,Link, Avatar, Box , MenuItem, AppBar, IconButton} from '@mui/material';
import { useCookies } from "react-cookie";
import { Center } from '@react-three/drei';

export default function NavBar(){
    
    const drawerWidth = '15%';
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [fontColor, setFont] = useState("black");
    const [bgcolor, setBgColor] = useState("white")
    const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
    const therapistInfo = cookies.user_token;


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
                    sx={{ width: 100, height: 100, border: "1px solid black"}} />
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <h4>Welcome!</h4>
                    <h4 variant="h6">{therapistInfo ? therapistInfo.name : "Loading..."}</h4>
                </Box>
            </Toolbar>
            <Divider />
            <Box sx={{ width: "100%", }}>
                <MenuList sx={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                    {mainListItems.map((v, i) => (
                        <MenuItem
                            selected={i === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, i)}
                            key={v.key}
                            component={Link}
                            href={v.key}
                            sx={{
                                width: '90%',
                                pt: 2,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    }
                                }
                            }}
                        >
                            <Button variant='contained' sx={{
                                width: "100%",
                                height: "50px",
                                bgcolor: bgcolor,
                                color: fontColor,
                            }}>
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
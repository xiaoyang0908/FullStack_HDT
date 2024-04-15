"use client"
import NavBar from "@/app/components/nav-links";
import Box from '@mui/material/Box';
import styles from "./layout.module.css";
import CssBaseline from '@mui/material/CssBaseline';
import LogOut from "../components/appBar";
export default function TherapistLayout({ children }) {
    return(

          <Box sx={{ display: 'flex', height:"100vh", overflow:"hidden"}}>
            <CssBaseline/>
            <NavBar/>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: '#F2F3F8', overflow:"hidden"}}
            >
              {children}
            </Box>
        </Box>
    )
}
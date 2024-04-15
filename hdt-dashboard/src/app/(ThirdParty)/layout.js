"use client"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/app/components/nav-links";

export default function TrdLayout({ children }) {
    return (
        <Box sx={{ display: 'flex', height: "100vh", overflow: "hidden" }}>
            <CssBaseline />
            <NavBar isDrawerEnabled={false} />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#F2F3F8', overflow:"hidden"}}
                >
                {children}
            </Box>
        </Box>
    )
}
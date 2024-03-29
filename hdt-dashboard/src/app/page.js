'use client'
import { Box, Container } from "@mui/material";
import Login from "./Login/Login";
import styles from "./page.module.css";


export default function Home() {
  return (
    <Box component="main" 
      sx={{
      display:"flex",
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', bgcolor:"#F2F3F8"}}>
        <Login />
    </Box>
  );
}

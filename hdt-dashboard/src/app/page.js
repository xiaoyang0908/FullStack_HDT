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
      minHeight: '100vh',}}>
      {/* <img src="" ></img> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="your-image-url" alt="Your Image" /> {/* 替换为你的图片 */}
        <Login />
      </Box>
    </Box>
  );
}

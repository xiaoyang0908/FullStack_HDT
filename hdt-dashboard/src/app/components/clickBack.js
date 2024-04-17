'use client'
import { Link } from "@mui/icons-material";
import { Box, Typography} from "@mui/material";
import { useRouter } from "next/navigation";

export function ClickBack({username, pagename}){
    const router = useRouter();
    const handleClickBack = () =>{
        router.back();
    }

    return(
        <Box sx={{display:"flex", width:"30vw", alignItems:"center"}}>
            <Box sx={{marginRight:1}} onClick={handleClickBack}>
                <img src="/backIcon.svg" alt="click back" sx={{width:"40px", height:"40px"}} loading="lazy"/>
            </Box>
            <Typography variant="text">Clients / {username} / {pagename}</Typography>
        </Box>
    )
}

import { AppBar } from "@material-ui/core";
import { Container,Toolbar,Button, Box } from "@mui/material";
import { CookieSetting } from "../util/cookieSetting";
import SignOutIcon from "@mui/icons-material/LogoutOutlined";
import { reqLoginOUt } from "../api/api";

export default function LogOut({ shadow, bgColour }){

    const {getToken,removeToken} = CookieSetting();

    const handleLogOut = async() =>{
        const res = await reqLoginOUt();
        console.log(res);
        if(res.status=="offline"){
            removeToken();
        }

       
    }
    return(
        <AppBar position="static" elevation={shadow ? 4 : 0} sx={{ bgcolor: bgColour, boxShadow: shadow ? 'default' : 'none' }}>
            <Toolbar  sx={{bgcolor:"white", height:30,display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Box sx={{display:"flex"}}>
                    <Box sx={{width:22, height:22, bgcolor:"rgba(117,144,210, 0.5)" }}>
                        <img src="/logo.svg" alt="Logo" sx={{width:22, height:22}} loading="lazy"/>
                    </Box>
                    <Box sx={{marginLeft:1}}>
                        <img src="/Rehab.svg" alt="Logo" sx={{width:96, height:20}} loading="lazy"/>
                    </Box>
                </Box>
                <Button onClick={handleLogOut} startIcon={<SignOutIcon/>}>
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    )
}
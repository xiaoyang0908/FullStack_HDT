import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TrdNavBar from '@/app/components/TrdNav-links';
import { Middleware } from '@/app/util/middleware';
export default function TrdLayout({ children }) {
    return(
        <Box sx={{ display: 'flex', height:"100%"}}>
            <Box
            component="main"
            sx={{ flexGrow: 1,}}>
            {children}
            </Box>
        </Box>
)
}
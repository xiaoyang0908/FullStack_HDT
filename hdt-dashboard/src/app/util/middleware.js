'use client'
import { CookieSetting } from "./cookieSetting";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { reqLoginOUt } from "../api/api";
export function Middleware({children}){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
        // setCurUser(currentUser.user);
    // signed in already
     const {getToken,setToken} = CookieSetting();
     const cookieUser = getToken();

       // if expired
     const handleUserExpire = async() =>{
       try {
            const res = await reqLoginOUt(cookieUser.email);
            return res;
       } catch (error) {
            new Error("Haven't signed in");
       }
       
     }
 

    //check cookie per hour
    useEffect(() => {
        const expirationCheckInterval = setInterval(() => {
            if (!cookieUser) {
                setOpen(true); 
                handleUserExpire();
                clearInterval(expirationCheckInterval); 
            }
        }, 60*60*1000);
        return () => clearInterval(expirationCheckInterval); 
    }, [cookieUser]);

    // listener
    const handleUserActivity = () => {
        // refresh cookie
        if(cookieUser){
            setToken(cookieUser,{
                path: "/",
                maxAge: 3600, // cookeie  expired after one hour
                sameSite: true,
            })
        }
    };
    useEffect(() => {
        const handleActivity = () => {
            handleUserActivity();
        };

        let timer = setTimeout(() => {
            window.addEventListener('mousemove', handleActivity);
            window.addEventListener('keypress', handleActivity);
        }, 59 * 59 * 1000); // 60 minutes = 60 * 60 seconds = 60 * 60 * 1000 milliseconds

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
        };
    }, []);

  

    
     useEffect(()=>{   
         console.log(`user is ${JSON.stringify(cookieUser)} `);
         if(cookieUser){
             console.log(cookieUser.role);
             if(cookieUser.role === "Patient"){
                 router.replace("/patientPage");
             }else if(cookieUser.role === "Therapist"){
                 router.replace("/therapistPage");
             }else if(cookieUser.role === "Caregiver"){
                 router.replace("/thirdPartyPage");
             }
        }else{
            router.push("/");
            
         }
     },[cookieUser,router]);


    return(
        <div>
            <Snackbar
                    open={open}
                    autoHideDuration={3000} // Increase to 3 seconds
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Snackbar position
                >
                    <Alert onClose={handleClose}>
                        The login is expired, Please login
                    </Alert>
                </Snackbar>
                {children}
        </div>
    )
}
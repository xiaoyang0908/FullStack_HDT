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
    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
        // setCurUser(currentUser.user);
    // signed in already
     const {getToken} = CookieSetting();
     const cookieUser = getToken();

       // if expired
     const handleUserExpire = async() =>{
       try {
            const res = await reqLoginOUt();
            return res;
       } catch (error) {
            new Error("Haven't signed in");
       }
       
     }
     const handleUserActivity = () => {
        // refresh cookie
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // 1hour
        document.cookie = `auth=${cookieUser}; expires=${expirationTime.toUTCString()}; path=/`;
    };

    //check cookie per hour
    useEffect(() => {
        const expirationCheckInterval = setInterval(() => {
            if (!cookieUser) {
                setOpen(true); 
                handleUserExpire()
                clearInterval(expirationCheckInterval); 
            }
        }, 60*60*1000);

        return () => clearInterval(expirationCheckInterval); 
    }, [cookieUser]);

    // listener
    useEffect(() => {
        const activityListener = () => {
            handleUserActivity();
        };

       
        window.addEventListener('mousemove', activityListener);
        window.addEventListener('keypress', activityListener);

        return () => {
            window.removeEventListener('mousemove', activityListener);
            window.removeEventListener('keypress', activityListener);
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
                 router.replace("/thirdPartyPAge");
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
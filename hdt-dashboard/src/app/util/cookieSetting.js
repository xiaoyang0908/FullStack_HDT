import { useCookies } from "react-cookie";

export const CookieSetting = () =>{
    const [cookies,setCookie, removeCookie] = useCookies(["user_token"]);

    // get token name
    const getToken = () => {
        return cookies.user_token;
    }
    // set token
    const setToken = (value, options) =>{
        setCookie("user_token", value, options);
    }

    // remove token
    const removeToken = () => {
        removeCookie("user_token");
    }


    return{
        getToken,
        setToken,
        removeToken
    }



}
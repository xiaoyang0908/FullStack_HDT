import axios from "axios";
import { CookieSetting } from "../util/cookieSetting";
//create axios instance
const service = axios.create({
    baseURL: "", //default url
    timeout: 50000, //request out of time
    withCredentials: false,
})


//get/post
export function get(url,params){
    return new Promise((resolve, reject) => {
        service({
            method: "GET",
            url:url,
            data:{},
            params:params,
        }).then((response)=>{
            // reponse successfully, then set the token in header
            // response.headers.set("application/x-www-form-urlencoded",getToken())
            resolve(response.data);
        }).catch(error=>{
            console.error('An error occurred:', error);
            reject(error); // Propagate the error
        })
    })
}

export function post(url,data){
    return new Promise((resolve, reject)=>{
        service({
            method:"POST",
            url:url,
            data:data,
        }).then((response)=>{
            resolve(response.data)
        }).catch(error=>{
            console.error('An error occurred:', error);
            reject(error); // Propagate the error
        })
    })
}
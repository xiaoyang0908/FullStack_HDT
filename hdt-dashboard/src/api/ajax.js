import axios from "axios";

//create axios instance
const service = axios.create({
    baseURL: "", //default url
    timeout: 50000, //request out of time
    withCredentials: false,
})

//get/post
export function get(url,params){
    return new Promise((resolve) => {
        service({
            method: "GET",
            url:url,
            data:{},
            params:params
        }).then((response)=>{
            resolve(response.data);
        }).catch(error=>{
            console.error('An error occurred:', error);
        })
    })
}

export function post(url,data){
    return new Promise((resolve)=>{
        service({
            method:"POST",
            url:url,
            data:data,
        }).then((response)=>{
            resolve(response.data)
        }).catch(error=>{
            console.error('An error occurred:', error);
        })
    })
}
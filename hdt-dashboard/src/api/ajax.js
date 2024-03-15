import axios from "axios";
import { resolve } from "styled-jsx/css";

//create axios instance
const instance = axios.create({
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
            message.error("request error");
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
            message.error("请求出错了"+error.message)
        })
    })
}
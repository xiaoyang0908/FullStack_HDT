import{get, post} from "./ajax";

export const reqLogin = (username, password)=>{
    try{
        return post("http://127.0.0.1:8090/login",{username:username,password:password})
    }catch(err){
        throw err
    }
}
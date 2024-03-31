import{get, post} from "./ajax";

export const reqLogin = (username, password)=>{
    try{
        return post("http://localhost:8090/login",{username,password})
    }catch(err){
        throw err
    }
}
import{get, post} from "./ajax";

export const reqLoginIn = (username, password)=>{
    try{
        return post("http://127.0.0.1:8090/api/auth",{username:username,password:password});
    }catch(err){
        throw err;
    }
}

export const reqLoginOUt = ()=>{
    try{
        return get("http://127.0.0.1:8090/api/logout");
    }catch(err){
        throw err;
    }
}


export const reqPatientsList = ()=>{
    try {
        return get("http://127.0.0.1:8090/api/patients");
    } catch (err) {
        console.error('Failed to fetch patients:', err);
        throw err;
    }
};

export const reqGame = ()=>{
    try{
        return get("http://127.0.0.1:8090/game");
    }catch(err){
        throw err;
    }
}

import{get, post} from "./ajax";

export const reqLogin = (username, password)=>{
    try{
        return post("http://127.0.0.1:8090/login",{username:username,password:password})
    }catch(err){
        throw err
    }
}

export const reqPatientsList = async () => {
    try {
        const response = await get("http://127.0.0.1:8090/api/patients");
        return response;
    } catch (err) {
        console.error('Failed to fetch patients:', err);
        throw err;
    }
};
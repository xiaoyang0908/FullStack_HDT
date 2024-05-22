import{get, post} from "./ajax";

export const reqLoginIn = (username, password)=>{
    try{
        return post("http://127.0.0.1:8090/api/auth",{username:username,password:password});
    }catch(err){
        throw err;
    }
}

export const reqLoginOUt = (username)=>{
    try{
        return post("http://127.0.0.1:8090/api/logout",{username:username});
    }catch(err){
        throw err;
    }
}


export const reqActivePatientsList = (email)=>{
    try {
        return post("http://localhost:8090/therapist/activePatients",{email:email});
    } catch (err) {
        throw err;
    }
};

export const reqGame = ()=>{
    try{
        return get("http://127.0.0.1:8090/game/gameList");
    }catch(err){
        throw err;
    }
}

export const reqTaskList = (patientID,taskinfo)=>{
    try {
        return post("http://127.0.0.1:8090/patient/tasks",{patientID:patientID,taskinfo:taskinfo});
    } catch (error) {
        throw err;
    }
}

export const reqDeleteTask = (patientID,taskId)=>{
    try {
        return post("http://127.0.0.1:8090/patient/deteteTask",{patientID:patientID,taskId:taskId});
    } catch (error) {
        throw err;
    }
}

export const reqSavePatient = (therapistEmail,patientProfile)=>{
    try {
        return post("http://127.0.0.1:8090/therapist/savePatient",{therapistEmail:therapistEmail,patientProfile:patientProfile});
    } catch (error) {
        throw err;
    }
}

export const reqUpdateThumbs = (therapistEmail,thumbsID)=>{
    try {
        return post("http://127.0.0.1:8090/therapist/Thumbs",{therapistEmail:therapistEmail,thumbsID:thumbsID});
    } catch (error) {
        throw err;
    }
}

export const reqCare = (caregiverEmail)=>{
    try {
        return post("http://127.0.0.1:8090/caregiver/info",{caregiverEmail:caregiverEmail});
    } catch (error) {
        throw err;
    }
}


export const reqCarePatientThumbs = ()=>{
    try {
        return get("http://127.0.0.1:8090/caregiver/thumbs");
    } catch (error) {
        throw err;
    }
}
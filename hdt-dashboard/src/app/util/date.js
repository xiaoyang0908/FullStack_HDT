export default function formatDate(date){
    let newdate = new Date(date);
    if(!newdate) {
        return;
    }else{
        if(newdate.getMonth()<10){
         return `0${(newdate.getMonth()+1)}/${newdate.getDate()}/${newdate.getFullYear()}`
        }else{
            return `${(newdate.getMonth()+1)}/${newdate.getDate()}/${newdate.getFullYear()}`
        }
    }
    
}
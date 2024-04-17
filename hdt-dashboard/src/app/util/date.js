export default function formatDate(date){
    let newdate = new Date(date);
    if(!newdate) {
        return;
    }else{
        return `${(newdate.getMonth()+1)}/${newdate.getDate()}/${newdate.getFullYear()}`
    }
    
}
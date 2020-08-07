
import config from "../../config";
import Axios from "axios";


export const listChapitresByRomanId = (id) =>{

    let list = [];
  
    return function(dispatch){
        console.log("******Début action listChapitresByRomanId**********")

        Axios.get(config.apiUrl+"readnovels-rle/chapitres/getAllByChapitresByRomanId/"+id
        ).then((res)=>{
            console.log("res : ",res)
            return res;
            
        })
        .then((response)=>{
            console.log("response action chapitres : ",response)
            list = response.data.chapitres;
            dispatch({
                type: "GET_ALL_CHAPITRES_BY_ROMAN",
                payload: list
            }) 
        })
        
        .catch((error)=>{
            console.log(error);
            
        });
    }


}





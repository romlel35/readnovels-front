
import config from "../../config";
import Axios from "axios";


export const listRomansByReaderId = (id) =>{

    let list = [];
  
    return function(dispatch){
        console.log("******Début action listRomansByReaderId**********")
        console.log("id : "+id)
        Axios.get(config.apiUrl+"readnovels-rle/romans/getAllByReaderId/"+id
        ).then((res)=>{
            console.log("res : ",res)
            return res;
            
        })
        .then((response)=>{
            console.log("response action : ",response.data)
            list = response.data.romans;
            dispatch({
                type: "GET_ALL_ROMANS_BY_READER",
                payload: list
            }) 
        })
        
        .catch((error)=>{
            console.log(error);
            
        });
    }


}

export const GetRomanById = (id) =>{

    let roman = null;
   
    return function(dispatch){
        console.log("******Début action GetRomanById**********");
        console.log("id : ",id);
        Axios.get(config.apiUrl+"readnovels-rle/romans/getRomanById/"+id
        ).then((res)=>{
            console.log("res : ",res)
            return res;
            
        })
        .then((response)=>{
            console.log("response action : ",response)
           roman = response.data.roman[0];
            
            dispatch({
                type: "GET_ROMAN_BY_ID",
                payload: roman
            }) 
        })
        
        .catch((error)=>{
            console.log(error);
            
        });
    }


}
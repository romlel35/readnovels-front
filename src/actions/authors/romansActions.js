
import config from "../../config";
import Axios from "axios";
export const listRomans = () =>{

    let list = [];

    return function(dispatch){

        fetch(config.apiUrl+"readnovels-rle/romans/getAll").then((res)=>{
         
            return res.json();
            
        })
        .then((response)=>{
            console.log("response action : ",response)
            list = response.romans;
            dispatch({
                type: "GET_ALL_ROMANS",
                payload: list
            }) 
        })
        
        .catch((error)=>{
            console.log(error);
            
        });
    }


}

export const listRomansByAuthorId = (id) =>{

    let list = [];
  
    return function(dispatch){
        console.log("******Début action listRomansByAuthorId**********")
        console.log("id : "+id)
        Axios.get(config.apiUrl+"readnovels-rle/romans/getAllByAuthorId/"+id
        ).then((res)=>{
            console.log("res : ",res)
            return res;
            
        })
        .then((response)=>{
            console.log("response action : ",response)
            list = response.data.romans;
            dispatch({
                type: "GET_ALL_ROMANS_BY_AUTHOR",
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
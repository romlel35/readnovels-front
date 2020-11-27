import {ADD_ONE} from "./typesActions";
import {REMOVE_ONE} from "./typesActions";
import {REMOVE_ALL} from "./typesActions";

export const addOne = (list,newItem) => {
   
     return function(dispatch){
       
        console.log("j'ajoute dans mon panier");
        console.log("newItem.id  :  ", newItem)
        let same = list.findIndex((b)=> b.id === newItem.id)
      console.log("same : ",same)
        if(same === -1) {
            list.push(newItem);
            newItem.quantityCart = 1;
            console.log("ma liste : ",list);
            window.localStorage.setItem("panier",JSON.stringify(list));
            dispatch({
                type: ADD_ONE,
                newPanier: list
            })
     
        }
    
    }  
}

 
 export const removeOne = (list, oldItem) => {

    console.log("je retire de mon panier");
    return function(dispatch){
        console.log("index à enlever : ",list.indexOf(oldItem));
        
        let result = list;
        if(oldItem.quantityCart === 1){
            list.splice(list.indexOf(oldItem),1)
           
        }
      
        window.localStorage.setItem("panier",JSON.stringify(list));
        dispatch({
            type: REMOVE_ONE,
            newPanier: list
        })
    }
 }

 export const removeAll = (list) => {

    console.log("je retire tout de mon panier");
    return function(dispatch){
      
        
        list = null;
        
        window.localStorage.setItem("panier",JSON.stringify(list));
        dispatch({
            type: REMOVE_ALL,
            newPanier: list
        })
    }
 }
 
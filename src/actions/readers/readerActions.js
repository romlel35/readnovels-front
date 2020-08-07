import {CONNECT_READER,LOGOUT_READER} from "./typeActions";


export const connectReader = (reader) =>{
    return function(dispatch){
        dispatch({
            type: CONNECT_READER,
            payload: reader
        })
    }

}

export const logoutReader= () =>{
    return function(dispatch){
        
        dispatch({
            type: LOGOUT_READER,
            payload: null
        })
        
    }
}
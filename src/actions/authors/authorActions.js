import {CONNECT_AUTHOR,LOGOUT_AUTHOR} from "./typeActions";


export const connectAuthor = (author) =>{
    return function(dispatch){
        dispatch({
            type: CONNECT_AUTHOR,
            payload: author
        })
    }

}

export const logoutAuthor = () =>{
    return function(dispatch){
        
        dispatch({
            type: LOGOUT_AUTHOR,
            payload: null
        })
        
    }
}
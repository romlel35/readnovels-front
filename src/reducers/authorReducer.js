import {CONNECT_AUTHOR, LOGOUT_AUTHOR} from "../actions/authors/typeActions";



const initialState = {
    infos: {},
    isLogged: false
}



export function authorReducer(state = initialState, action){
    switch(action.type){
        case CONNECT_AUTHOR:
            return {infos: action.payload, isLogged: true}

        break;

        case LOGOUT_AUTHOR: 
            return initialState;

        break;

       default: 
            return state;

       break;
            
    }

    return state;
}


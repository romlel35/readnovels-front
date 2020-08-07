import {CONNECT_READER, LOGOUT_READER} from "../actions/readers/typeActions";



const initialState = {
    infos: {},
    isLogged: false
}



export function readerReducer(state = initialState, action){
    switch(action.type){
        case CONNECT_READER:
            return {infos: action.payload, isLogged: true}

        break;

        case LOGOUT_READER: 
            return initialState;

        break;

       default: 
            return state;

       break;
            
    }

    return state;
}


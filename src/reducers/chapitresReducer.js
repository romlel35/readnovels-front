const initialState = { listChapitres : null}

export default function chapitresReducer(state= initialState, action){
    switch(action.type) {
        case "GET_ALL_CHAPITRES_BY_ROMAN":
            console.log(action);
            return {listChapitres: action.payload}
            
        break;
     
      
    }
    
    
    return state;
}
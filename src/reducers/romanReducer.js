
const initialState = {  roman: null};

export default function romansReducer(state= initialState, action){
    switch(action.type) {
        case "GET_ROMAN_BY_ID":
            console.log(action);
            return {roman: action.payload}
            
        break;
     
      
    }
    
    
    return state;
}
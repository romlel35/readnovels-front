
const initialState = { listRomans : null};

export default function romansReducer(state= initialState, action){
    switch(action.type) {
        case "GET_ALL_ROMANS":
            console.log(action);
            return {listRomans: action.payload}
            
        break;
        case "GET_ALL_ROMANS_BY_AUTHOR":
            console.log(action);
            return {listRomans: action.payload}
            
        break;
      
    }
    
    
    return state;
}
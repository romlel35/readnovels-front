
const initialState = { listRomansReader : null};

export default function romansReaderReducer(state= initialState, action){
    switch(action.type) {
        
        case "GET_ALL_ROMANS_BY_READER":
            console.log(action);
            return {listRomansReader: action.payload}
            
        break;
      
    }
    
    
    return state;
}
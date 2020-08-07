import { combineReducers } from "redux";
import {authorReducer} from "./authorReducer";
import romansReducer from "./romansReducer";
import {readerReducer} from "./readerReducer";
import romanReducer from "./romanReducer";
import chapitresReducer from "./chapitresReducer.js";
import panierReducer from "./panierReducer";

const rootReducer = combineReducers({

   author: authorReducer,
   romans: romansReducer,
   roman: romanReducer,
   chapitres: chapitresReducer,
   reader: readerReducer,
   panier: panierReducer

})

export default rootReducer;
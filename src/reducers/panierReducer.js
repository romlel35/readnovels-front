let list = JSON.parse(window.localStorage.getItem("panier")); //lcoaleStorage à un problème avec les objets et tableau, utilisr JSON.stringify() et JSON.parse()
if(list === null ){
    list = [];
}
const initialState = { panier : list};

export default function panierReducer(state= initialState, action){
    switch(action.type) {
        case "ADD_ONE":
            console.log(action);
            return {panier: action.newPanier}
        case "REMOVE_ONE":
            console.log(action)
            return { panier: action.newPanier}
        case "REMOVE_ALL":
            console.log(action)
            return { panier: action.newPanier}
            
        break;
    }
    
    
    return state;
}
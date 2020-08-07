import React from 'react';
import {Link} from 'react-router-dom';
import {removeAll} from "../actions/panier";
import {connect} from 'react-redux';

//Page de succès de la commande
class Success extends React.Component {
    
    componentDidMount(){
        window.localStorage.removeItem('coachme-basket');
        this.props.removeAll()
    }
    
    render(){            
        
        return (
            <div>
                <p>La commande a été effectué avec succès</p>
                <Link to="/">Retour</Link>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
  return {
    panier: store.panier,
  }
}
const mapDispatchToProps = {
	removeAll
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
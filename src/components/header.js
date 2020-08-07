import {Link} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {logoutAuthor} from "../actions/authors/authorActions"
class Header extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){

        console.log (this.props);
    }

    render(){


        return(

            <div >
                <nav>
                <h2><Link  to="/home">Accueil</Link></h2>
             
                {this.props.author.isLogged === false &&  this.props.reader.isLogged === false && <h2><Link to="/register">S'enregistrer</Link></h2>}
                {this.props.author.isLogged === false && this.props.reader.isLogged === false && <h2><Link to="/login">Se connecter</Link></h2>}

              
                 {this.props.author.isLogged === true && <h2><Link to="/profil">Profil</Link></h2>}
                 {this.props.author.isLogged === true && <h2><Link to="/romans">Romans</Link></h2>}
                {this.props.author.isLogged === true && <h2><Link to="/logout">Se déconnecter</Link></h2>} 

                {this.props.reader.isLogged === true && <h2><Link to="/profilReader">Profil</Link></h2>}
                {this.props.reader.isLogged === true && <h2><Link to="/logoutReader">Se déconnecter</Link></h2>} 
                {this.props.reader.isLogged === true && <h2><Link to="/bookstore">Librairie</Link></h2>} 
                {this.props.reader.isLogged === true && <h2><Link to="/library">Bibliothèque</Link></h2>} 
                {this.props.reader.isLogged === true && <h2><Link to="/cart">Panier</Link></h2>} 


                </nav>

               
              
                <div id="flag">
                    <h1>LisDesRomans</h1>

                </div>
            </div>
           


        )
    }
}


const mapStateToProps = (store) => {
    return {
        //lessons : store.lessons,
        author: store.author,
        reader: store.reader
    }
  }
  const mapDispatchToProps = {
     //listLessons
     logoutAuthor
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);

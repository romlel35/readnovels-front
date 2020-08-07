import React from "react";
import {connect} from 'react-redux';
import {addOne, removeOne, removeAll} from "../actions/panier";
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,cloudinary
  } from "cloudinary-react";
import {Link} from "react-router-dom";

class Panier extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            msg : null,
        
        }
    }





    render(){
        let totalPrice = 0;
        if(this.props.panier.panier !== null){
          
            let taille = this.props.panier.panier.length;
          
            for(let i = 0; i < taille; i++ ){
             
                let price = this.props.panier.panier[i].price;
             
                 
                  
                    totalPrice += price;
                    
             
           
            }
                console.log("totalPrice", totalPrice);
           
        }
      
        return(
            <div>
                 <h2> Votre panier contient : </h2>

               


                    <div id="vitrine">
                        
                        <ul>
                        {this.props.panier.panier !== null &&
                        
              this.props.panier.panier.map((roman,index)=> {
                 
                    return(
                      
                       <div key={index}className="itemPanier">
                           <h3>{roman.title}</h3>
                           <CloudinaryContext cloudName="hg3x1q3eq">
                                            <div>
                                                <Image publicId={roman.imgUrl}>
                                                    <Transformation quality="auto" fetchFormat="auto" gravity="face" width="100" height="150" crop="thumb"/>
                                                </Image>
                                            </div>
                                        </CloudinaryContext>
                       
                     
                        <button onClick={
                            (e) => {
                                this.props.removeOne(this.props.panier.panier,roman)
                            }
                            }>Retirer du panier</button>
                        
                  
                    </div>
                        
                        )
                })
            }
                        </ul>
                      
            <p>Total price : { totalPrice} euros{
            this.props.panier.panier !== null &&
            this.totalPrice }</p> 
            
            <p>{this.state.error !== null &&
            this.state.error
    }</p>
    <p>{this.state.result !== null &&
    this.state.result
    
    }</p>

    {this.props.panier.panier.length > 0  &&
     <Link to="/pay"> Go to paiement</Link>

    }
           
                    </div>
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
   
    addOne,
    removeOne,
    removeAll

    
}


export default connect(mapStateToProps, mapDispatchToProps)(Panier)

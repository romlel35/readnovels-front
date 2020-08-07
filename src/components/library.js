import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';

import {listRomans,listRomansByAuthorId} from "../actions/authors/romansActions";
import {addOne} from "../actions/panier"

import "react-datepicker/dist/react-datepicker.css";
import config from'../config';
import moment from 'moment';
import localization from 'moment/locale/fr';
import {Link} from "react-router-dom";
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,cloudinary
  } from "cloudinary-react";

moment.updateLocale('fr', localization);

var format = require('date-format');
format.asString(); //defaults to ISO8601 format and current date.
format.asString(new Date()); //defaults to ISO8601 format
format.asString('hh:mm:ss.SSS', new Date()); //just the time
var FA = require('react-fontawesome')


class Library extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
        
        }
        this.title ="";
        this.category = "";
        this.summary = "";
     
        registerLocale('fr', fr)
      
    }
   

    onChangetext(type, text) {
		this[type] = text;
	}

  
   
    
    componentDidMount = () =>{
     
     
            console.log("ici on monte les romans!!!!")
            this.props.listRomans();
            //this.props.listRomans();
        
        
       
    
    }


    render(){
        console.log("****Sur la liste des Romans******")
      console.log(this.props)
       
   
        return(


            <div>
               
              <h2> Romans disponibles</h2>
               {this.state.msg !== null &&
                            <p>{this.state.msg}</p>
                            }

                <div id="romansAdmin">
                
                   




                    {this.props.romans.listRomans !== null &&
                    <div id="editNovels">
                      <ul>
                  
                         {this.props.romans.listRomans.map((roman, index) =>{

                             return(

                              
                                   
                                     <li className="hoverDetail" key={index}>
                                       <h3> {roman.title}</h3>
                                         <CloudinaryContext cloudName="hg3x1q3eq">
                                            <div>
                                                <Image publicId={roman.imgUrl}>
                                                    <Transformation quality="auto" fetchFormat="auto" gravity="face" width="100" height="150" crop="thumb"/>
                                                </Image>
                                            </div>
                                        </CloudinaryContext>
                                        <p>  Price : {roman.price} euros </p> <p><button><FA 
                                 
                                 className="cart"
                                 size='3x'
                                
                                 style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                 name="shopping-cart" 
                                 onClick={(e) =>{
                                     e.preventDefault();
                                     this.props.addOne(this.props.panier.panier,roman)
                                 }}/></button></p>
                                    </li>
                                
                             )

                         })}
                  
                  </ul>


                                                                
                 
                    </div>

                    }


                </div>
           
            </div>
        )
    }


}
const mapStateToProps = (store) => {
    return {
      romans : store.romans,
      author: store.author,
      panier: store.panier
    }
  }
  const mapDispatchToProps = {
     listRomans,
     listRomansByAuthorId,
     addOne
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Library );


  /*
  
               
  */
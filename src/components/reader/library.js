import React from 'react';
import {connect} from 'react-redux'

import fr from 'date-fns/locale/fr';
import {listRomansByReaderId} from "../../actions/readers/romansActions";


import {Link} from "react-router-dom";
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,cloudinary
  } from "cloudinary-react";



class Library extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
        
        }
        this.title ="";
        this.category = "";
        this.summary = "";
     
        
      
    }
   

    onChangetext(type, text) {
		this[type] = text;
	}

  
   
    
    componentDidMount = () =>{
     
     
            console.log("ici on monte les romans!!!!")
            this.props.listRomansByReaderId(this.props.reader.infos.id);
           
        
        
       
    
    }


    render(){
        console.log("****Sur la liste des Romans du lecteur******")
      console.log(this.props)
       
   
        return(


            <div>
               
              <h2>Votre bibliothèque</h2>
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
                                       <Link to={"lecture/"+roman.id}>
                                       <h3> {roman.title}</h3>
                                         <CloudinaryContext cloudName="hg3x1q3eq">
                                            <div>
                                                <Image publicId={roman.imgUrl}>
                                                    <Transformation quality="auto" fetchFormat="auto" gravity="face" width="100" height="150" crop="thumb"/>
                                                </Image>
                                            </div>
                                        </CloudinaryContext>
                                       </Link>
                                      
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
      reader: store.reader,
      panier: store.panier
    }
  }
  const mapDispatchToProps = {
     
     listRomansByReaderId,
    
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Library );


  /*
  
               
  */
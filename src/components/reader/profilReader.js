import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import config from'../../config';

import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,cloudinary
  } from "cloudinary-react";


class Profil extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
        
        }
        this.firstName = this.props.reader.infos.firstName;
        this.lastName = this.props.reader.infos.lastName;
        this.email = this.props.reader.infos.email;
      
        this.pseudo = this.props.reader.infos.pseudo;
      
    
      
    }
    checkUploadResult = (resultEvent) => {
	    if (resultEvent.event === "success") {
		      console.log("RESULT", resultEvent);
	
		      console.log(resultEvent.info);
		      let data = {
		      	imageUrl: resultEvent.info.public_id,
		      	id: this.props.reader.infos.id
		      }
	
		      Axios.post(config.apiUrl+'readnovels-rle/readers/updateImg', data, { headers: { 'x-access-token': this.props.reader.infos.token }})
		      .then((response)=>{
				       	console.log(response)
				       	if(response.data.status === 200) {
				       		this.setState({
                                  msg: 'Votre profil a bien été édité'});
				       	}
				        
				    })
		    }
      };
       //cloudinary needs some JS script to put in your index.html
    showWidget = () => {
	    let widget = window.cloudinary.createUploadWidget(
	      {
	        cloudName: "hg3x1q3eq",
	        uploadPreset: "ebwnm9zh",
	        maxImageWidth: 400,
	        cropping: false,
	      },
	      (error, result) => {
	        console.log(error);
	        console.log(result);
	        this.checkUploadResult(result);
	      }
	    );
	    widget.open();
      };

    onChangetext(type, text) {
		this[type] = text;
	}

    
    handleSubmitUpdatePersonalInfos = () =>{
        
        console.log(this.lastName)
       
                let data = {
                    id: this.props.reader.infos.id,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email : this.email,
                    address: this.address,
                    zip: this.zip,
                    city: this.city,
                }
        console.log("data dans edit : ",data)
    
        Axios.put(config.apiUrl+"readnovels-rle/readers/update", data , { headers: { 'x-access-token': this.props.reader.infos.token }}).then((response) =>{

                if(response.status !== 200){
                   this.setState({msg: "There was a problem during the update"})
                }
                else{
                    this.setState({msg : "Your infos have been successfully updated"})
                }
               
        })
       
        .catch((err)=>{
            console.log(err);
        })

      
    }

    
    componentDidMount = () =>{
        console.log("****sur le profil******")
        console.log(this.props)
        
       
    
    }


    render(){
      
        console.log("props3 : ",this.props)
        this.firstName = this.props.reader.infos.firstName;
        this.lastName = this.props.reader.infos.lastName;
        this.email = this.props.reader.infos.email;
      
        this.pseudo = this.props.reader.infos.pseudo;
   
        return(


            <div>
                {this.props.reader.isLogged && // il faut que le résultat de la confition soit du jsx (balise)
                <h2>Profil de  {
                    this.props.reader.infos.firstName
                }</h2>}

                       

                <div>
                
                   

                        <form id="reader"
                         onSubmit={(e)=>{
                        e.preventDefault();
                        this.handleSubmitUpdatePersonalInfos();
                        }}>
                          
                            


                            <CloudinaryContext cloudName="hg3x1q3eq">
                                <div>
                                <Image publicId={this.props.reader.infos.imgUrl}>
                                    <Transformation quality="auto" fetchFormat="auto" gravity="face" width="100" crop="thumb"/>
                                </Image>
                                </div>
		                    </CloudinaryContext>
                            <button
                            onClick={(e) => {
                            e.preventDefault();
                            this.showWidget();
                            }}
			                >
			            Ajoutez une Photo
			         </button>
                            {this.props.reader.isLogged && 

                            <fieldset className="topField">
                                <label htmlFor="firstName">Prénom: </label>
                                <input id="firstName" name="firstName" 
                               defaultValue={this.props.reader.infos.firstName}
                                    onChange={(e)=>{
                                    this.onChangetext('firstName',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                             }
                            <fieldset className="insideField">
                                <label htmlFor="lastName">Nom : </label>
                                <input id="lastName" name="lastName"  
                                 defaultValue={this.props.reader.infos.lastName}
                                onChange={(e)=>{
                                    this.onChangetext('lastName',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField">
                                <label htmlFor="email">Email : </label>
                                <input id="email" name="email" type="email" 
                                 defaultValue={this.props.reader.infos.email}
                                onChange={(e)=>{
                                    this.onChangetext('email',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                       
                           
                            <fieldset className="insideField" >
                                <label htmlFor="pseudo">Pseudo : </label>
                                <input id="pseudo" name="pseudo" 
                                 defaultValue={this.props.reader.infos.city}
                                onChange={(e)=>{
                                    this.onChangetext('pseudo',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                           
                            {this.state.msg !== null &&
                            <p class="msg">{this.state.msg}</p>
                            }
                            <button type="submit">Mettez à jour vos infos persos</button>
                    </form>
                    


                </div>
               

           
            </div>
        )
    }


}
const mapStateToProps = (store) => {
    return {
        //lessons : store.lessons,
        reader: store.reader
    }
  }
  const mapDispatchToProps = {
     //listLessons
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profil);

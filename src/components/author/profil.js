import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
//import {listLessons} from "../../actions/authors/listeLessons";
import "react-datepicker/dist/react-datepicker.css";
import config from'../../config';
import moment from 'moment';
import localization from 'moment/locale/fr';
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
class Profil extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
        
        }
        this.firstName = this.props.author.infos.firstName;
        this.lastName = this.props.author.infos.lastName;
        this.email = this.props.author.infos.email;
        this.address = this.props.author.infos.address;
        this.zip = this.props.author.infos.zip;
        this.city = this.props.author.infos.city;
        this.penName = this.props.author.infos.penName;
        
        registerLocale('fr', fr)
      
    }
    checkUploadResult = (resultEvent) => {
	    if (resultEvent.event === "success") {
		      console.log("RESULT", resultEvent);
	
		      console.log(resultEvent.info);
		      let data = {
		      	imageUrl: resultEvent.info.public_id,
		      	id: this.props.author.infos.id
		      }
	
		      Axios.post(config.apiUrl+'readnovels-rle/authors/updateImg', data, { headers: { 'x-access-token': this.props.author.infos.token }})
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
        console.log("coucou")
        console.log(this.lastName)
       
                let data = {
                    id: this.props.author.infos.id,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email : this.email,
                    address: this.address,
                    zip: this.zip,
                    city: this.city,
                    penName: this.penName
                }
        console.log("data dans edit : ",data)
    
        Axios.put(config.api_url+"authors/updateAuthor", data , { headers: { 'x-access-token': this.props.author.infos.token }}).then((response) =>{

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
        this.firstName = this.props.author.infos.firstName;
        this.lastName = this.props.author.infos.lastName;
        this.email = this.props.author.infos.email;
        this.address = this.props.author.infos.address;
        this.zip = this.props.author.infos.zip;
        this.city = this.props.author.infos.city;
   
        return(


            <div>
                {this.props.author.isLogged && // il faut que le résultat de la confition soit du jsx (balise)
                <h2>Profil de  {
                    this.props.author.infos.firstName
                }</h2>}

                        {this.state.msg !== null &&
                            <p>{this.state.msg}</p>
                            }

                <div>
                
                   

                        <form id="author"
                         onSubmit={(e)=>{
                        e.preventDefault();
                        this.handleSubmitUpdatePersonalInfos();
                        }}>
                            
                            


                            <CloudinaryContext cloudName="hg3x1q3eq">
                                <div>
                                <Image publicId={this.props.author.infos.imgUrl}>
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
                            {this.props.author.isLogged && 

                            <fieldset className="topField">
                                <label htmlFor="firstName">Prénom : </label>
                                <input id="firstName" name="firstName" 
                               defaultValue={this.props.author.infos.firstName}
                                    onChange={(e)=>{
                                    this.onChangetext('firstName',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                             }
                            <fieldset className="insideField">
                                <label htmlFor="lastName">Nom : </label>
                                <input id="lastName" name="lastName"  
                                 defaultValue={this.props.author.infos.lastName}
                                onChange={(e)=>{
                                    this.onChangetext('lastName',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField">
                                <label htmlFor="email">Email : </label>
                                <input id="email" name="email" type="email" 
                                 defaultValue={this.props.author.infos.email}
                                onChange={(e)=>{
                                    this.onChangetext('email',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                       
                            <fieldset className="insideField" > 
                                <label htmlFor="address">Adresse : </label>
                                <input id="address" name="address"  
                                 defaultValue={this.props.author.infos.address}
                                onChange={(e)=>{
                                    this.onChangetext('address',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField" >
                                <label htmlFor="zip">Code postal : </label>
                                <input id="zip" name="zip"
                                 defaultValue={this.props.author.infos.zip}
                                onChange={(e)=>{
                                    this.onChangetext('zip',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField" >
                                <label htmlFor="city">Ville : </label>
                                <input id="city" name="city" 
                                 defaultValue={this.props.author.infos.city}
                                onChange={(e)=>{
                                    this.onChangetext('city',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField" >
                                <label htmlFor="penName">Nom de plume : </label>
                                <input id="penName" name="penName" 
                                 defaultValue={this.props.author.infos.city}
                                onChange={(e)=>{
                                    this.onChangetext('penName',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                           
                           
                            <button type="submit">MEttez à jour vos infos persos</button>
                    </form>
                    


                </div>
               

           
            </div>
        )
    }


}
const mapStateToProps = (store) => {
    return {
        //lessons : store.lessons,
        author: store.author
    }
  }
  const mapDispatchToProps = {
     //listLessons
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profil);

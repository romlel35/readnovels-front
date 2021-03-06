import React from "react";
import Axios from "axios";
import config from "../../config";

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {

            msg: null,
            role: "auteur"
        }
        this.firstName = "";
        this.lastName="";
        this.email= "" ;
        this.password =  "";
        this.address = "";
        this.zip = "";
        this.city = "";
        this.penName = "";
        this.pseudo = ""
    }

    onChangetext(type, text) {
		this[type] = text;
    }
    
    validatorPassword(password){

        if(password.length < 8){
            return false;
        }
        else{
            return true
        }

    }
    handleSubmit(){
        

        if(this.validatorPassword(this.password)){
            if(this.state.role === "auteur"){
                let data = {

                    firstName:this.firstName,
                    lastName:this.lastName,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    zip: this.zip,
                    city: this.city,
                    penName: this.penName,
                
        
                }
                console.log("data : ",data);
                Axios.post(config.apiUrl+"readnovels-rle/authors/register", data)
                .then((response) =>{
        
                    if(response.data.status === 200){
                        console.log("L'auteur a bien été enregistré, vous pouvez vous connecter");
                        this.setState({msg :"Vous avez bien été enregistré : )"});
                        this.firstName = "";
                        this.lastName="";
                        this.email= "" ;
                        this.password =  "";
                        this.address = "";
                        this.zip = "";
                        this.city = "";
                        this.penName = "";
                        
                    }
                    else if(response.data.status !== 200){
                        this.setState({msg :response.data.msg})
                    }
                })

            }
            else if(this.state.role === "lecteur"){
                let data = {

                    firstName:this.firstName,
                    lastName:this.lastName,
                    email: this.email,
                    password: this.password,
                   pseudo: this.pseudo,
                    role: "reader"
        
                }
                console.log("data : ",data);
                Axios.post(config.apiUrl+"readnovels-rle/readers/register", data)
                .then((response) =>{
        
                    if(response.data.status === 200){
                        console.log("Le lecteur a bien été enregistré");
                        this.setState({msg :"Vous avez bien été enregistré, vous pouvez vous connecter"});
                        this.firstName = "";
                        this.lastName="";
                        this.email= "" ;
                        this.password =  "";
                        this.pseudo = "";
                    }
                    else if(response.data.status !== 200){
                        this.setState({msg :response.data.msg})
                    }
                })
        
    
    
            }
          
        }
        else{
            this.setState({msg : "Votre mot de passe doit faire au moins 8 caractères de longueur"})
        }
        
    }
    
    handleChange(event){

        this.setState({role: event.target.value})
    }
    render(){



        return (

            <div>
                <h2>Inscrivez-vous</h2>

             
               <p>Es-tu auteur(trice) ou lecteur? </p> 
                <select  onChange={(e)=>{
                                  
                                  this.handleChange(e);
                                  
                              }}>
                  <option>auteur</option>
                  <option>lecteur</option>
                </select>
                <form 
                onSubmit={(e)=>{
                    e.preventDefault();
                    this.handleSubmit();
                }}>
                    <fieldset className="topField">
                        <label htmlFor="firstName">Prénom : </label>
                        <input id="firstName" name="firstName" 
                        onChange={(e)=>{
                            this.onChangetext('firstName',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField">
                        <label htmlFor="lastName">Nom : </label>
                        <input id="lastName" name="lastName"
                        onChange={(e)=>{
                            this.onChangetext('lastName',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField">
                        <label htmlFor="email">Email : </label>
                        <input id="email" name="email" type="email" 
                        onChange={(e)=>{
                            this.onChangetext('email',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField" >
                        <label htmlFor="password">Mot de passe : </label>
                        <input id="password" type ="password" name="password" 
                        onChange={(e)=>{
                            this.onChangetext('password',e.currentTarget.value)
                        }}></input>
                        <legend>Votre mot de passe doit faire au moins 8 caractères</legend>
                    </fieldset>
                   {this.state.role === "auteur" &&
                   
                   <div>
                        <fieldset className="insideField" > 
                            <label htmlFor="address">Adresse : </label>
                            <input id="address" name="address" 
                            onChange={(e)=>{
                                this.onChangetext('address',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset className="insideField" >
                            <label htmlFor="zip">Code postal : </label>
                            <input id="zip" name="zip" 
                            onChange={(e)=>{
                                this.onChangetext('zip',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset className="insideField" >
                            <label htmlFor="city">Ville : </label>
                            <input id="city" name="city" 
                            
                            onChange={(e)=>{
                                this.onChangetext('zip',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset >
                            <label htmlFor="penName">Nom de plume : </label>
                            <input id="penName" name="penName"
                            onChange={(e)=>{
                                this.onChangetext('penName',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                   </div>
                   
                   }
                    
                    {this.state.role === "lecteur" &&
                    <fieldset >
                        <label htmlFor="pseudo">pseudo : </label>
                        <input id="pseudo" name="pseudo" placeholder="pseudo" 
                        onChange={(e)=>{
                            this.onChangetext('pseudo',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    }
                       {this.state.msg !== null &&
                <p className="msg">{this.state.msg}</p>
                }
                    <button type="submit">Créer un compte</button>
                </form>

            </div>
        )


    }
}

export default Register
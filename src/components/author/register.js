import React from "react";
import Axios from "axios";
import config from "../../config";

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {

            msg: null,
            role: "reader"
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
        console.log("coucou on passe dans handleSubmit");

        if(this.validatorPassword(this.password)){
            if(this.state.role === "author"){
                let data = {

                    firstName:this.firstName,
                    lastName:this.lastName,
                    email: this.email,
                    password: this.password,
                    address: this.address,
                    zip: this.zip,
                    city: this.city,
                    penName: this.penName,
                    role: "author"
        
                }
                console.log("data : ",data);
                Axios.post(config.apiUrl+"readnovels-rle/authors/register", data)
                .then((response) =>{
        
                    if(response.data.status === 200){
                        console.log("L'auteur a bien été enregistré");
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
            else if(this.state.role === "reader"){
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
                        this.setState({msg :"Vous avez bien été enregistré : )"});
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

                {this.state.msg !== null &&
                <p>{this.state.msg}</p>
                }
                Es-tu auteur(trice) ou lecteur? 
                <select  onChange={(e)=>{
                                  
                                  this.handleChange(e);
                                  
                              }}>
                  <option>lecteur</option>
                  <option>auteur</option>
                </select>
                <form 
                onSubmit={(e)=>{
                    e.preventDefault();
                    this.handleSubmit();
                }}>
                    <fieldset className="topField">
                        <label htmlFor="firstName">First Name : </label>
                        <input id="firstName" name="firstName" placeholder="firstName"
                        onChange={(e)=>{
                            this.onChangetext('firstName',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField">
                        <label htmlFor="lastName">Last Name : </label>
                        <input id="lastName" name="lastName" placeholder="lastName" 
                        onChange={(e)=>{
                            this.onChangetext('lastName',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField">
                        <label htmlFor="email">Email : </label>
                        <input id="email" name="email" type="email"  placeholder="email"
                        onChange={(e)=>{
                            this.onChangetext('email',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    <fieldset className="insideField" >
                        <label htmlFor="password">Password : </label>
                        <input id="password" type ="password" name="password" placeholder="password" 
                        onChange={(e)=>{
                            this.onChangetext('password',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                   {this.state.role === "author" &&
                   
                   <div>
                        <fieldset className="insideField" > 
                            <label htmlFor="address">Address : </label>
                            <input id="address" name="address" placeholder="address" 
                            onChange={(e)=>{
                                this.onChangetext('address',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset className="insideField" >
                            <label htmlFor="zip">Zip : </label>
                            <input id="zip" name="zip" placeholder="zip"
                            onChange={(e)=>{
                                this.onChangetext('zip',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset className="insideField" >
                            <label htmlFor="city">City : </label>
                            <input id="city" name="city" placeholder="city"
                            
                            onChange={(e)=>{
                                this.onChangetext('zip',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                        <fieldset >
                            <label htmlFor="penName">penName : </label>
                            <input id="penName" name="penName" placeholder="penName" 
                            onChange={(e)=>{
                                this.onChangetext('penName',e.currentTarget.value)
                            }}></input>
                        </fieldset>
                   </div>
                   
                   }
                    
                    {this.state.role === "reader" &&
                    <fieldset >
                        <label htmlFor="pseudo">pseudo : </label>
                        <input id="pseudo" name="pseudo" placeholder="pseudo" 
                        onChange={(e)=>{
                            this.onChangetext('pseudo',e.currentTarget.value)
                        }}></input>
                    </fieldset>
                    }
                    
                    <button type="submit">create account</button>
                </form>

            </div>
        )


    }
}

export default Register
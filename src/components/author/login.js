import {Link} from "react-router-dom";
import React, { Component } from 'react';
import Axios from 'axios';
import config from "../../config";
import {Redirect} from 'react-router-dom';
/* import {LinkButtons} from '../LinkButtons'; */


class Login extends React.Component {

    constructor(props){
        super(props);


        this.state = {
            msg: null,
            redirect: false,
            role: "lecteur"
        }
        this.email="";
		this.password="";
    }

    
    onChangetext(type, text) {
		this[type] = text;
	}
    handleChange(event){

        this.setState({role: event.target.value})
    }

    handleSubmit(){

        let data  ={
            email:this.email,
            password: this.password
        } 
        
        console.log("url : ",config.apiUrl)

        let url;
        if(this.state.role === "lecteur"){
            url = config.apiUrl+"readnovels-rle/readers/login";
        }
        else if(this.state.role === "auteur"){
            url = config.apiUrl+"readnovels-rle/authors/login";
        }
        Axios.post(url, data)
        .then((response) =>{
           
            if(response.data.status === 200){
                console.log("you are succesfully connected")
                 this.setState({msg: "vous êtes connecté"})
                 if(this.state.role === "lecteur"){
                    window.localStorage.setItem('readnovels-reader-token', response.data.token);
                    window.localStorage.setItem('reader', response.data.reader);
                    this.setState({redirect: true});
                }else{
                    window.localStorage.setItem('readnovels-author-token', response.data.token);
                    window.localStorage.setItem('author', response.data.author);
                    this.setState({redirect: true});
                }
               
            
            }
          
           else{
               this.setState({msg : "Erreur : "+response.data.msg})
           }

           
           // 
        })

    }
    render= () =>{
        if( this.state.redirect === true){

            if(this.state.role === "lecteur"){
                return <Redirect to="/profilReader" />
            }
            else{
                return <Redirect to="/profil" />
            }
            
        }
      
    
        return(
            <div>

                <h2>Connectez-vous</h2>
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
                <form onSubmit={ (e) =>{

                    e.preventDefault();
                    this.handleSubmit();

                }}>
                   
                    <fieldset>
                        <label htmlFor="email">Email : </label>
                        <input id="email" type="email" name="email"  
                          onChange={(e)=>{
							this.onChangetext('email',e.currentTarget.value)
						}}></input>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Mot de passe : </label>
                        <input id="password" type ="password" name="password" 
                          onChange={(e)=>{
							this.onChangetext('password',e.currentTarget.value)
						}}></input>
                    </fieldset>
      
                    <button type="submit">Se connecter</button>

                </form>
              <Link to="/forgotPassword"> Mot de passe oublié</Link>
            </div>



        )
    }


}
export default Login
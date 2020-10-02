/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {TextField} from '@material-ui/core';
import config from "../config";
import {
    LinkButtons,
    updateButton,
    homeButton,
    loginButton,
    HeaderBar,
    forgotButton,
    inputStyle,
    SubmitButtons,
  } from './extensions';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Récupération de mot de passe',
};


export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      role:"",
      email: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
   
  }
  handleChange(event){

    this.setState({role: event.target.value})
}

 async  componentDidMount() {
  let token  = this.props.match.params.token;
    try {
      const response = await axios.get(config.apiUrl+"readnovels-rle/reset/"+token,);
       console.log(response);
      if (response.data.status === 200) {
        this.setState({
         email: response.data.user.email,
          updated: false,
          isLoading: false,
          error: false,
        });
      
        
      }
    } catch (error) {
     
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
   
    let data = {
     role: this.state.role,
      password,
      resetPasswordToken: token,
     email: this.state.email
    }
    try {
      const response = await axios.put(
        config.apiUrl+'readnovels-rle/updatePasswordViaEmail',data,
      );
      console.log(response.data);
      if (response.data.status === 200) {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
    const {
 password, error, isLoading, updated 
} = this.state;

   if (error) {
      return (
       <div>


          <HeaderBar title={title} />
         
         
          <div style={loading}>
            <h4>Problème lors de la création du lien de récupération. Envoyez un nouveau mail de récupération.</h4>
            <LinkButtons
              buttonText="Go Home"
              buttonStyle={homeButton}
              link="/"
            />
            <LinkButtons
              buttonStyle={forgotButton}
              buttonText="Forgot Password?"
              link="/forgotPassword"
            />
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Chargement des infos de l'utilisateur...</div>
        </div>
      );
    }
    return (

     
      <div>
        <HeaderBar title={title} />
        <div id="testChoix">
         Es-tu auteur(trice) ou lecteur(trice)? 
                <select  onChange={(e)=>{
                                  
                                  this.handleChange(e);
                                  
                              }}>
                  <option>lecteur</option>
                  <option>auteur</option>
                </select>
         </div>
        <form className="password-form" onSubmit={this.updatePassword}>
          <TextField
            style={inputStyle}
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
            type="password"
          />
          <SubmitButtons
            buttonStyle={updateButton}
            buttonText="Mettre à jour le mot de passe"
          />
        </form>

        {updated && (
          <div>
            <p>
             Votre mot de passe a bien été mis à jour.
            </p>
            <LinkButtons
              buttonStyle={loginButton}
              buttonText="Login"
              link="/login"
            />
          </div>
        )}
        <LinkButtons buttonText="Accueil" buttonStyle={homeButton} link="/" />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};
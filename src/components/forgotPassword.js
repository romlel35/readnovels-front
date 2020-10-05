import {Link} from "react-router-dom";
import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import axios from 'axios';
import config from "../config";
import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  forgotButton,
  inputStyle,
  HeaderBar,
} from './extensions';

const title = {
  pageTitle: 'Forgot Password Screen',
};

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          config.apiUrl+'forgotPassword',
          {
            email,
          },
        ).then((response) => {

        console.log("réponse send mail, : ",response)
          if (response.data.status === 200) {
            this.setState({
              showError: false,
              messageFromServer: 'mail de récupération envoyé',
              showNullError: false,
            });
          }
          else{
            this.setState({
              showError: true,
              messageFromServer: 'mail non présent en base de donnée',
              showNullError: true,
            });
          }
        })
       
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const {
 email, messageFromServer, showNullError, showError 
} = this.state;

    return (
      <div>
        <HeaderBar title={title} />
        <form className="profile-form" onSubmit={this.sendEmail}>
          <TextField
            style={inputStyle}
            id="email"
            label="email"
            value={email}
            onChange={this.handleChange('email')}
            placeholder="Email Address"
          />
          <SubmitButtons
            buttonStyle={forgotButton}
            buttonText="Send Password Reset Email"
          />
        </form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <LinkButtons
              buttonText="Register"
              buttonStyle={registerButton}
              link="/register"
            />
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        <Link to="/" >Accueil</Link>
      </div>
    );
  }
}

export default ForgotPassword;

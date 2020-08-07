import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import axios from "axios";
import config from '../config'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {removeOne} from "../actions/panier";

// formulaire de carte bancaire
class CheckoutForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        redirect: false,
        redirectBasket: false
      }
    }
    
    // lors de l'envoie du formulaire
    handleSubmit = async (event) => {
        event.preventDefault();
        
        let data = {
            email: this.props.reader.infos.email,
            panier: this.props.panier.panier
        }
        
        const paymentAuth = await axios.post(config.apiUrl+'readnovels-rle/romans/payment', data, { headers: { 'x-access-token': this.props.reader.infos.token }});
        if (paymentAuth.data.status === 500) {
          this.props.removeToBasket(this.props.panier.panier, paymentAuth.data.roman);
          this.setState({redirectBasket: true});
        }

        console.log(paymentAuth);
        console.log("***********Après ça merde*****");
       
        const secret = paymentAuth.data.client_secret;
        console.log("secret : "+secret);
        const payment = await this.props.stripe.confirmCardPayment(secret, {
                              payment_method: {
                                card: this.props.elements.getElement(CardElement),
                                billing_details: {
                                  email: this.props.reader.infos.email
                                },
                              },
                            });
                            
        if (payment.error) {
            console.log(payment.error.message);
            
        } else {
            // si le paiement est un succes
            if (payment.paymentIntent.status === 'succeeded') {
                console.log('Money is in the bank!');
                let data = {
                  panier: this.props.panier.panier,
                  status: "payed",
                  reader_id: this.props.reader.infos.id
                }
                //on enregistre en bdd le status payed 
                axios.put(config.apiUrl+"readnovels-rle/romans/validate", data, { headers: { 'x-access-token': this.props.reader.infos.token }})
                .then((response)=>{
                    console.log(response);
                    this.setState({redirect: true})
                })
            }
        }
    }
        
    render() {
        if(this.state.redirectBasket) {
          return <Redirect to="/panier" />
        }


        if(this.state.redirect) {
          return <Redirect to="/success" />
        }
        const {stripe} = this.props;
        // 
        return (
          <form onSubmit={this.handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        );
      }

}


// branchement au store redux
const mapStateToProps = (store) => {
  return {
  	  reader: store.reader,
      panier: store.panier,
  }
}
const mapDispatchToProps = {
	removeOne,
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
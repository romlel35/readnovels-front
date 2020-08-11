import React from 'react';
import CheckoutForm from './checkout-form'
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';

// page de paiement
class Payment extends React.Component {
	constructor(props){
		super(props)
	}

	InjectedCheckoutForm = ()=>{
		// chargement du formulaire de carte bleue
		return (
			<ElementsConsumer>
			    {({stripe, elements}) => (
			      <CheckoutForm orderId={this.props.match.params.orderId} stripe={stripe} elements={elements} />
			    )}
			</ElementsConsumer>

		)
	}

	render(){
		const stripePromise = loadStripe("pk_test_51GxqC2LdwUClRI7SFvJQrLVgbsippXlraOBiLtQ9nDAxocMd7qPXRMCJCrIQJKx4YVf9zS3s1p3n3TwBvtbEDM0F00trBfgNKp");

		return (
			<div>
				<h2>Paiement</h2>
				<Elements stripe={stripePromise}>
				    {this.InjectedCheckoutForm()}
				</Elements>
			</div>
		)
	}
}

export default Payment;
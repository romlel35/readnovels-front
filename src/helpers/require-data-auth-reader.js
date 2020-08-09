import React, { Component } from 'react';
import { connect } from "react-redux";
import config from "../config";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import {connectReader} from '../actions/readers/readerActions'

export default function(ChildComponent, withAuth = false) {
    class RequireDataAuthReader extends Component {

		constructor(props) {
			super(props);
			this.state = {
				redirect: false
			}
            
		}
		
		componentDidMount(){
			    
	
		   console.log(this.props)
            
            
           if(this.props.reader.isLogged === false) {
			const token = window.localStorage.getItem('readnovels-reader-token');
			
			if(token === null && withAuth) {
				this.setState({redirect: true})
			}  else {
				console.log("ça passe dans le else : ");
				axios.get(config.apiUrl+"readnovels-rle/readers/checkToken", { headers: { "x-access-token": token }})
				.then((response)=>{
                    console.log("Réponse du checktoken ci-dessous")
					console.log(response);
					if(response.data.status !== 200) {
						if(withAuth === true) {
							this.setState({redirect: true})
						}
					} else {
						console.log("je suis passé par là");
						let reader = response.data.reader[0];
						reader.token = token;
						this.props.connectReader(reader);
						console.log('reader.id : ',reader.id)
						//this.props.listLessons(reader.id); --> A changer avec les romans/chapitres
					}
				})
			}
			
			
			}
		}
		
		render(){
			if(this.state.redirect) {
				return <Redirect to="/login"/>
			}
			return (<ChildComponent {...this.props}/>)
		}
		
    }
    
    
    const mapStateToProps = (store) => {
	  return {
		
	  reader: store.reader
	  }
	}

	const mapDispatchToProps = {
		
		connectReader,
		
	}

	return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuthReader);

}
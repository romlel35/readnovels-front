import React, { Component } from 'react';
import { connect } from "react-redux";

import axios from "axios";
import {Redirect} from 'react-router-dom';
import {connectAuthor} from '../actions/authors/authorActions'

export default function(ChildComponent, withAuth = false) {
    class RequireDataAuth extends Component {

		constructor(props) {
			super(props);
			this.state = {
				redirect: false
			}
            
		}
		
		componentDidMount(){
			    
	
		   console.log(this.props)
            
            
           if(this.props.author.isLogged === false) {
			const token = window.localStorage.getItem('readnovels-author-token');
			
			if(token === null && withAuth) {
				this.setState({redirect: true})
			}  else {
				//console.log("ça passe dans le else : ");
				axios.get("http://localhost:8000/readnovels-rle/authors/checkToken", { headers: { "x-access-token": token }})
				.then((response)=>{
                    //console.log("Réponse du checktoken ci-dessous")
					//console.log(response);
					if(response.data.status !== 200) {
						if(withAuth === true) {
							this.setState({redirect: true})
						}
					} else {
						//console.log("je suis passé par là");
						let author = response.data.author[0];
						author.token = token;
						this.props.connectAuthor(author);
						console.log('author.id : ',author.id)
						//this.props.listLessons(author.id); --> A changer avec les romans/chapitres
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
		
	  author: store.author
	  }
	}

	const mapDispatchToProps = {
		
		connectAuthor,
		
	}

	return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);

}
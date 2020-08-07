import React from 'react';
import {connect} from "react-redux";
import {logoutAuthor} from "../../actions/authors/authorActions";
import {Redirect} from "react-router-dom";

class Logout extends React.Component {
    constructor(props){
		super(props)
		this.state ={
			redirect: false
		}
	}
	
	componentDidMount(){
		window.localStorage.removeItem('readnovels-author-token');
		this.props.logoutAuthor();
		this.setState({redirect: true})
	}
	
	render(){
	    return <Redirect to="/"/>
	}
    
    
}

const mapStateToProps = (store) => {
  return {
  
  	author: store.author
  }
}
const mapDispatchToProps = {
	logoutAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
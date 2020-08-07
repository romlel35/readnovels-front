import React from 'react';
import {connect} from "react-redux";
import {logoutReader} from "../../actions/readers/readerActions";
import {Redirect} from "react-router-dom";

class LogoutReader extends React.Component {
    constructor(props){
		super(props)
		this.state ={
			redirect: false
		}
	}
	
	componentDidMount(){
		window.localStorage.removeItem('readnovels-reader-token');
		this.props.logoutReader();
		this.setState({redirect: true})
	}
	
	render(){
	    return <Redirect to="/"/>
	}
    
    
}

const mapStateToProps = (store) => {
  return {
  
  	reader: store.reader
  }
}
const mapDispatchToProps = {
	logoutReader
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutReader);
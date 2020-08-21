import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {listRomans,listRomansByAuthorId} from "../../actions/authors/romansActions";
import config from'../../config';
import {Link} from "react-router-dom";




class Romans extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
        
        }
        this.title ="";
        this.category = "";
        this.summary = "";
        this.price = "";
     
 
      
    }
   

    onChangetext(type, text) {
		this[type] = text;
	}

    handleDelete(id){
        console.log("******fonction deleteRoman*******");

        Axios.delete(config.apiUrl+"readnovels-rle/romans/delete/"+id , { headers: { 'x-access-token': this.props.author.infos.token }}).then((response) =>{

            if(response.status === 200){
                if(response.data.status === 200){
                    this.setState({msg: response.data.msg});
                    this.props.listRomansByAuthorId(this.props.author.infos.id);
                }
                else{
                    this.setState({msg: response.data.msg})
                }
            }
            else{
                this.setState({msg: response.msg})
            }
        })
    }
    handleSubmitAddNovel = () =>{
      
     
       
                let data = {
                    author_id: this.props.author.infos.id,
                    title: this.title,
                    category: this.category,
                    summary: this.summary,
                    price : this.price

                }
        console.log("data dans edit : ",data)
    
        Axios.post(config.apiUrl+"readnovels-rle/romans/register", data , { headers: { 'x-access-token': this.props.author.infos.token }}).then((response) =>{

                if(response.status !== 200){
                   this.setState({msg: "There was a problem during the update"})
                }
                else{
                    this.setState({msg : "Your roman has been successfully added"});
                   
                    console.log("ici on monte les romans!!!!")
                    this.props.listRomansByAuthorId(this.props.author.infos.id);
                }
              
               
        })
       
        .catch((err)=>{
            console.log(err);
        })

    }

    
    componentDidMount = () =>{
     
        console.log("ici on monte les romans")
        this.props.listRomansByAuthorId(this.props.author.infos.id);
           
            //this.props.listRomans();
        
        
       
    
    }


    render(){
        console.log("****Sur la liste des Romans******")
      console.log(this.props)
       
   
        return(


            <div>
               
              <h2>Vos romans</h2>
               {this.state.msg !== null &&
                            <p>{this.state.msg}</p>
                            }

                <div id="romansAdmin">
                
                   

                        <form id="addRoman"
                         onSubmit={(e)=>{
                        e.preventDefault();
                        this.handleSubmitAddNovel();
                        }}>
                            <h3>Ajoutes un nouveau roman</h3>
                            


			    

                            <fieldset className="topField">
                                <label htmlFor="title">Titre : </label>
                                <input id="title" name="title" 
                             
                                    onChange={(e)=>{
                                    this.onChangetext('title',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                             
                            <fieldset className="insideField">
                                <label htmlFor="category">Catégorie : </label>
                                <select    onChange={(e)=>{
                                    this.onChangetext('category',e.currentTarget.value)
                                }}>
                                    <option>fantasy</option>
                                    <option>romance</option>
                                    <option>science-fiction</option>
                                </select>
                            </fieldset>
                            <fieldset className="insideField">
                                <label htmlFor="summary">Résumé : </label>
                                <input id="summary" name="summary" 
                                 maxLength="150"
                                onChange={(e)=>{
                                    this.onChangetext('summary',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                            <fieldset className="insideField">
                                <label htmlFor="price">Prix : </label>
                                <input id="price" name="price" type="number" 
                                 maxLength="5"
                                onChange={(e)=>{
                                    this.onChangetext('price',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                       
                          
                           
                           
                            <button type="submit">
                               Envoies ton roman sur l'internet !
                            </button>
                    </form>



                    {this.props.romans.listRomans !== null &&
                    <div id="editNovels">
                        <h3>Tes romans</h3>
                        <p>Cliques sur un roman pour lui ajouter des chapitres et/ou une couverture</p>
                    <table>
                     <thead>
                     <tr>
                         <td className="bolder">romans</td>
                         <td className="bolder"> actions</td>
                     </tr>
                     </thead>
                    
                     <tbody>
                         {this.props.romans.listRomans.map((roman, index) =>{

                             return(

                                 <tr key={"tr"+index}>
                                   
                                     <td className="hoverDetail"><Link to={"detailRoman/"+roman.id}>{roman.title}</Link></td><td><button onClick={ (e) =>{
                                         e.preventDefault();
                                         this.handleDelete(roman.id);
                                     }}>delete</button></td>
                                 </tr>
                             )

                         })}
                     </tbody>



                 </table>
                 
                    </div>

                    }


                </div>
           
            </div>
        )
    }


}
const mapStateToProps = (store) => {
    return {
      romans : store.romans,
        author: store.author
    }
  }
  const mapDispatchToProps = {
     listRomans,
     listRomansByAuthorId
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Romans);


  /*
  
               
  */
import React from 'react';
import {connect} from 'react-redux'
import Axios from 'axios';
import {listRomans,listRomansByAuthorId, GetRomanById} from "../../actions/authors/romansActions";
import {listChapitresByRomanId} from "../../actions/authors/chapitresActions";
import config from'../../config';
import {
    Image,
    Video,
    Transformation,
    CloudinaryContext,cloudinary
  } from "cloudinary-react";






class Romans extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg : null,
            
            contentView :"",
        
        }
        this.title ="";
        this.content = "";
        this.chapterSelected = "";
        this.numChapter = 1;
      
     
      
    }

    handleChange(event) {
      this.chapterSelected = event.target.value;
      console.log("chapterSelected : ",this.chapterSelected);

      
      for(let i = 0; i< this.props.chapitres.listChapitres.length; i++){
     
        console.log("********comparaison********");
        console.log("this.props.chapitres.listChapitres[i].title : ", this.props.chapitres.listChapitres[i].title );
        console.log("***************");

        let comparateur = "Chapitre n°"+i+" : "+this.props.chapitres.listChapitres[i].title;
        if(this.chapterSelected === comparateur ){
          this.setState({ contentView: this.props.chapitres.listChapitres[i].content });
         
        }
      }
      
    }

    checkUploadResult = (resultEvent) => {
        if (resultEvent.event === "success") {
              console.log("RESULT", resultEvent);
    
              console.log(resultEvent.info);
              let data = {
                  imageUrl: resultEvent.info.public_id,
                  id: this.props.roman.roman.id
              }
    
              Axios.post(config.apiUrl+'readnovels-rle/romans/updateImg', data, { headers: { 'x-access-token': this.props.author.infos.token }})
              .then((response)=>{
                           console.log(response)
                           if(response.data.status === 200) {
                               this.setState({
                                  msg: 'Votre profil a bien été édité'});
                           }
                        
                    })
            }
      };
       //cloudinary needs some JS script to put in your index.html
    showWidget = () => {
        let widget = window.cloudinary.createUploadWidget(
          {
            cloudName: "hg3x1q3eq",
            uploadPreset: "ebwnm9zh",
            maxImageWidth: 400,
            cropping: false,
          },
          (error, result) => {
            console.log(error);
            console.log(result);
            this.checkUploadResult(result);
          }
        );
        widget.open();
      };
    
    onChangetext(type, text) {
		this[type] = text;
	}

  
  handleSubmitAddChapter(){

    console.log("****Add a chapter*******");

    let data = {

      title : this.title,
      content : this.content,
      roman_id : this.props.roman.roman.id
    }


    Axios.post(config.apiUrl+"readnovels-rle/chapitres/register", data , { headers: { 'x-access-token': this.props.author.infos.token }}).then((response) =>{


      if(response.status !== 200){
        console.log("Il ya eu un problème à la sauvegarde");
      }
      else{
        console.log("Le chapitre a bien été ajouté")
      }
    })
  }

  seeChapitres(){
   
    this.props.listChapitresByRomanId(this.props.roman.roman.id);
    this.setState({contentView: this.props.chapitres.listChapitres[0].content})
   
    
  }
    
    componentDidMount = () =>{
     
     
            console.log("*****On charge le Roman que l'auteur veut voir****");
            const id = this.props.match.params.id
            this.props.GetRomanById(id);

    
    }


    render(){
        console.log("****Sur la liste des Romans******")
      console.log(this.props)
      if(this.props.roman.roman !== null ){
        if(this.props.roman.roman.nbrChapters === 0){
            this.setState({msgChapters : "Vous n'avez pas encore ajouté de chapitres"})
        }
      } 
  
        return(


            <div>
               
        <h2>Détail du roman {this.props.roman.roman !==null &&
    <div> {this.props.roman.roman.title}
     {this.props.roman.roman.nbr_chapters &&
        <p><small>Vous n'avez pas encore ajouté de chapitres</small></p>
    } </div>         
  
    }</h2>
               {this.state.msg !== null &&
                            <p>{this.state.msg}</p>
                            }
                             {this.props.roman.roman !==null &&
                            <CloudinaryContext cloudName="hg3x1q3eq">
                                <div>
                                <Image publicId={this.props.roman.roman.imgUrl}>
                                    <Transformation quality="auto" fetchFormat="auto" gravity="face" width="100" crop="thumb"/>
                                </Image>
                                </div>
		                    </CloudinaryContext>
    }
                            <button
                            onClick={(e) => {
                            e.preventDefault();
                            this.showWidget();
                            }}
			                >
			            Upload Photo
			         </button>
                            
                      <button onClick={(e) =>{
                        e.preventDefault();
                        this.seeChapitres();
                      }}>Voir liste chapitre</button>      
                    <div>

                        <h2>Liste des chapitres</h2>
                            {this.props.chapitres.listChapitres !== null &&
                            <div>
                            <select onChange={(e)=>{
                                  
                                  this.handleChange(e);
                                  
                              }}>

                              {this.props.chapitres.listChapitres.map((chapitre, index) =>{

                                return(

                                  <option key ={index}  >

                                 Chapitre n°{index} :  {chapitre.title}
                                  </option>
                                )
                              })}
                              </select>

                              <article id="contentChapter">

                                <p>{this.state.contentView}</p>
                              </article>
                            </div>
                            
                            }
                            
                    </div>
                    <div>
                      <h2>Ajouter un chapitre</h2>
                      <form id="addRoman"
                         onSubmit={(e)=>{
                        e.preventDefault();
                        this.handleSubmitAddChapter();
                        }}>
                            
                            


			    

                            <fieldset className="topField">
                                <label htmlFor="title">Title : </label>
                                <input id="title" name="title" 
                             
                                    onChange={(e)=>{
                                    this.onChangetext('title',e.currentTarget.value)
                                }}></input>
                            </fieldset>
                             
                          
                            <fieldset className="insideField">
                                <label htmlFor="content">Content : </label>
                                <textarea id="content" name="content" type="content" 
                                 maxLength="5000"
                                onChange={(e)=>{
                                    this.onChangetext('content',e.currentTarget.value)
                                }}></textarea>
                            </fieldset>
                       
                          
                           
                           
                            <button type="submit">
                                Send your new chapter
                            </button>
                    </form>
                    </div>
           
            </div>
        )
    }


}
const mapStateToProps = (store) => {
    return {
        romans : store.romans,
        author: store.author,
        roman: store.roman,
        chapitres: store.chapitres
    }
  }
  const mapDispatchToProps = {
     listRomans,
     listRomansByAuthorId,
     GetRomanById,
     listChapitresByRomanId
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Romans);


  /*
  
               
  */
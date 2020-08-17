import React from "react";
import {connect} from 'react-redux'
import {listRomans,listRomansByAuthorId, GetRomanById} from "../../actions/authors/romansActions";
import {listChapitresByRomanId} from "../../actions/authors/chapitresActions";
import config from'../../config';

class SalonLecture extends React.Component{



    constructor(props){
        super(props);
        this.state = {
            msg : null,
            
            contentView :"",
        
        }
        this.Chargement = false;
        this.title ="";
        this.content = "";
        this.chapterSelected = "";
      
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
     

      seeChapitres(){
       
         this.props.listChapitresByRomanId(this.props.roman.roman.id);
         this.Chargement = true;
      
       


        
      }


      componentDidMount = () =>{
     
     
        console.log("*****On charge le Roman que le lecteur veut voir****");
        const id = this.props.match.params.id
        this.props.GetRomanById(id);


}
    render(){
        if(this.props.roman.roman !== null ){
            if(this.props.roman.roman.nbrChapters === 0){
                this.setState({msgChapters : "Vous n'avez pas encore ajouté de chapitres"})
            }
          } 
          if(this.Chargement){
            this.setState({contentView: this.props.chapitres.listChapitres[0].content});
            this.Chargement = false;
          }

          return(

            <div>


                <h2>Votre salon de lecture {this.props.roman.roman !==null &&
                <div> {this.props.roman.roman.title}
                 {this.props.roman.roman.nbr_chapters &&
                    <p><small>Vous n'avez pas encore ajouté de chapitres</small></p>
                } </div>         
              
                }</h2>
                 <button onClick={(e) =>{
                        e.preventDefault();
                        this.seeChapitres();
                       
                      }}>Voir liste chapitre</button>      

                <p>{this.state.msg !== null &&
                    <p>{this.state.msg}</p>
                    }</p>

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

  export default connect(mapStateToProps, mapDispatchToProps) (SalonLecture)



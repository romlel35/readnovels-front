import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer"

import {Route, Switch} from 'react-router-dom';
import Register from './components/author/register';
import Login from './components/author/login';
import Home from './components/home';
import RequireDataAuth from "./helpers/require-data-auth";
import RequireDataAuthReader from "./helpers/require-data-auth-reader";
import Profil from "./components/author/profil";
import Logout from "./components/author/logout";
import Romans from "./components/romans";

import DetailRoman from "./components/detailRoman";
import BookStore from "./components/bookstore";
import Library from "./components/library";
import Panier from "./components/panier";

import ProfilReader from "./components/reader/profilReader";
import LogoutReader from "./components/reader/logoutReader";

import Paiement from "./components/payement";


function App() {
  return (
    <div className="App">
     <Header />

     <Route exact path="/" component={RequireDataAuth(Home)}/>
     <Route exact path="/register" component={RequireDataAuth(Register)}/>
     <Route exact path="/login" component={RequireDataAuth(Login)}/>
     <Route exact path="/home" component={RequireDataAuth(Home)}/>

     <Route exact path="/profil" component={RequireDataAuth(Profil, true)}/>
     <Route exact path="/logout" component={RequireDataAuth(Logout, true)}/>
     <Route exact path="/romans" component={RequireDataAuth(Romans, true)}/>
     <Route exact path="/detailRoman/:id" component={RequireDataAuth(DetailRoman, true)}/>


     <Route exact path="/profilReader" component={RequireDataAuthReader(ProfilReader, true)}/>
     <Route exact path="/logoutReader" component={RequireDataAuthReader(LogoutReader, true)}/>
     <Route exact path="/bookStore" component={RequireDataAuthReader(BookStore, true)}/>
     <Route exact path="/library" component={RequireDataAuthReader(Library, true)}/>
     <Route exact path="/cart" component={RequireDataAuthReader(Panier, true)}/>
     <Route exact path="/pay" component={RequireDataAuthReader(Paiement, true)}/>
  
     <Footer />
    </div>
  );
}

export default App;

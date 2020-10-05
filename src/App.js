import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer"
import Home from './components/home';
import RequireDataAuth from "./helpers/require-data-auth";
import RequireDataAuthReader from "./helpers/require-data-auth-reader";

import Register from './components/author/register';
import Login from './components/author/login';
import Profil from "./components/author/profil";
import Logout from "./components/author/logout";
import Romans from "./components/author/romans";
import DetailRoman from "./components/author/detailRoman";

import BookStore from "./components/reader/bookstore";
import Library from "./components/reader/library";
import SalonLecture from "./components/reader/salonLecture";
import Panier from "./components/reader/panier";
import ProfilReader from "./components/reader/profilReader";
import LogoutReader from "./components/reader/logoutReader";
import Paiement from "./components/reader/payement";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword"
function App() {
  return (
    <div className="App">
     <Header />

     <Route exact path="/" component={RequireDataAuth(Home)}/>
     <Route exact path="/register" component={RequireDataAuth(Register)}/>
     <Route exact path="/login" component={RequireDataAuth(Login)}/>
     <Route exact path="/home" component={RequireDataAuth(Home)}/>
     <Route exact path="/forgotPassword" component={RequireDataAuth(ForgotPassword)}/>
     <Route exact path="/reset/:token" component={RequireDataAuth(ResetPassword)}/>

     <Route exact path="/profil" component={RequireDataAuth(Profil, true)}/>
     <Route exact path="/logout" component={RequireDataAuth(Logout, true)}/>
     <Route exact path="/romans" component={RequireDataAuth(Romans, true)}/>
     <Route exact path="/detailRoman/:id" component={RequireDataAuth(DetailRoman, true)}/>


     <Route exact path="/profilReader" component={RequireDataAuthReader(ProfilReader, true)}/>
     <Route exact path="/logoutReader" component={RequireDataAuthReader(LogoutReader, true)}/>
     <Route exact path="/bookStore" component={RequireDataAuthReader(BookStore, true)}/>
     <Route exact path="/library" component={RequireDataAuthReader(Library, true)}/>
     <Route exact path="/lecture/:id" component={RequireDataAuthReader(SalonLecture, true)}/>

     <Route exact path="/cart" component={RequireDataAuthReader(Panier, true)}/>
     <Route exact path="/pay" component={RequireDataAuthReader(Paiement, true)}/>
  
     <Footer />
    </div>
  );
}

export default App;

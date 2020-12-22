import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter,
  Redirect
} from "react-router-dom";

import Home from "./Home";
import Tetris from "./TetrisGame";
import TicTacToe from './TicTacToeGame';
import Leaderboard from "./Leaderboard";


const PrivateRoute = ({component: Component, ...rest}) => (
  <Route { ...rest} render={(props) => (
    auth.isAuth === true
      ? <Component {...props} />
      : <Redirect to='/login'/>
  )}/>
) 

const auth = {
  isAuth : false,
  authenticate(cb){
    this.isAuth = true;
    setTimeout(cb, 100);
  },
  signOut(cb){
    this.isAuth = false;
    setTimeout(cb, 100);
  }
}

class Login extends Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    if(document.getElementById("username").value === "WeLove" && document.getElementById("password").value === "ComS319"){
      auth.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer:true
      }))
    })
  }
  }
  render(){

    const { redirectToReferrer } = this.state

    if(redirectToReferrer === true){
      return(
        <Redirect to='/' />
      )
    }
    return(
      <div>
        <p>Login to have access to site!</p>
        <input type="text" id= "username" ref="username" placeholder="username"/>
        <input type="text" id= "password" ref="password" placeholder="password"/>
        <button onClick={this.login}>Log in</button>
      </div>  
    );
  }
}

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>GameHub</h1>
          <ul className="header">
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/Tetris">Tetris</NavLink></li>
            <li><NavLink to="/TicTacToe">TicTacToe</NavLink></li>
            <li><NavLink to="/leaders">Leaderboard</NavLink></li>            
          </ul>
          <div className="content">
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute path="/Tetris" component={Tetris}/>
            <PrivateRoute path="/TicTacToe" component={TicTacToe}/>
            <PrivateRoute path="/leaders" component={Leaderboard}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;
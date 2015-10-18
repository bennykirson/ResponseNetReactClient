import React from 'react';
import LogoutSegment from '../form/logoutSegment';
import LoginSegment from '../form/loginSegment';


var Login = React.createClass({
  componentWillMount() {
    if (localStorage.userName) {
      this.setState({
        userVerified: true,
        userName: localStorage.userName
      });
    }
  },
  getInitialState() {
    return {
      userVerified: false,
      userName: "",
      warningMessage:false
    }
  },
  logoutHandler(value){
    this.setState({
      userVerified: false,
      userName: ""
    });
    localStorage.clear();
  },
  signInHandler(value){
    if(value){
    this.setState({
      userVerified: true,
      userName: localStorage.userName,
      warningMessage:false
    });}else{
      this.setState({
        warningMessage:true
      });
    }
  },


  render()
  {
    return this.state.userVerified ? (
        <LogoutSegment userInjection={this.state.userName} onClick={this.logoutHandler}/>
    ) : (
        <LoginSegment onClick={this.signInHandler} warningMessage={this.state.warningMessage}/>
    );
  }
});

export default Login;

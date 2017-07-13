import React from 'react';
import fire from '../../fire';
import style from './style.css';
import Login from './login';
import Signup from './signup';

export default class Sign extends React.Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      login: true
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }
  switch(word) {
    let signup1='';
    let login1='';
    if (word === 'signup') {
      signup1 = true;
      login1 = false;
    } else {
      signup1 = false;
      login1 = true;
    }
    return this.setState({
      signup: signup1,
      login: login1
    });
  }
  signup(first, last, email, pass) {
    fire.auth().createUserWithEmailAndPassword(email, pass)
              .then(() => {
                const uid = fire.auth().currentUser.uid;
                fire.database().ref(`users/${uid}`).set({
                  first: first,
                  last: last,
                  email: email
                });
                const path = '/userview';
                document.location.href = path;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error===>"+error);
  	            alert(errorMessage);
              });
  }

  login(email, pass) {
    fire.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
              const path = '/userview';
              document.location.href = path;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("error===>"+error);
	            alert(errorMessage);
            });
  }
  render() {
    return (
      <div id="space">
        <div>
          <div id="buttons">
            <p id="signupButton" onClick={this.switch.bind(this, 'signup')} className={this.state.signup ? 'yellow' : 'blue'}>Signup</p>
            <p id="loginButton" onClick={this.switch.bind(this, 'login')} className={this.state.login ? 'yellow' : 'blue'}> Login</p>
          </div>
           { this.state.signup ? <Signup signup={this.signup} /> : null}
           {this.state.login ? <Login func={this.login}/> : null}
        </div>
      </div>
    );
  }
}

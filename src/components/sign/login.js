import React from 'react';
import style from './style.css';
import PropTypes from 'prop-types';

export default class Login extends React.Component {


  clickHandle() {
    this.props.func(this.refs.email.value, this.refs.pass.value);
  }
  render() {
    return (

      <div>
        <div id="login">
          <input ref="email" type="email" id="email" placeholder="Email" />
          <input ref="pass" type="password" id="password" placeholder="Password" />
          <button id="send" onClick={this.clickHandle.bind(this)}>Login</button>
        </div>
      </div>

    );
  }
}
Login.PropTypes = {
  clickHandle: PropTypes.func
};

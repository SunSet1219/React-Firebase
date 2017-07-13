import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

export default class Signup extends React.Component {

  clickHandle() {
    if (this.refs.pass.value !== this.refs.confirm.value) {
      alert("Password is not correct !");
      return;
    }
    if (this.refs.first.value === '' || this.refs.last.value === '') {
      alert('Please insert First name and Last name!');
      return;
    }
    this.props.signup(this.refs.first.value,
      this.refs.last.value, this.refs.email.value,
      this.refs.pass.value);
  }
  render() {
    return (
      <div>
        <div id="signup">
          <input ref="first" type="text" id="first" placeholder="First Name" />
          <input ref="last" type="text" id="last" placeholder="Last Name" />
          <input ref="email" type="email" id="email" placeholder="Email" />
          <input ref="pass" type="password" id="password" placeholder="Password" />
          <input ref="confirm" type="password" id="confirm" placeholder="Confirm Password" />
          <button id="send" onClick={this.clickHandle.bind(this)}>Signup</button>
        </div>
      </div>
    );
  }
}
Signup.PropTypes = {
  clickHandle: PropTypes.func
};

import { Link } from 'react-router-dom';
import React from 'react';
import fire from '../fire';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut().then(() => {
      document.location.href = '/';
    }).catch((error) => {
      alert(error);
    });
  }
  render() {
    const style = {
      background: '#000',
      color: '#fff',
      height: 60
    };
    const style1 = {
      color: '#fff',
      marginRight: 20,
      textDecoration: 'none',
      marginLeft: 10,
      marginTop: 20
    };

    return (
      <div style={style}>
        <Link to="/userview" style={style1}>UserView</Link>
        <Link to="/adminview" style={style1}>AdminView</Link>
        <a onClick={this.logout} style={{ cursor: 'pointer' }}>Logout</a>
      </div>
    );
  }
}

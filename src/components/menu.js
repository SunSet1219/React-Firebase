import { Link } from 'react-router-dom';
import React from 'react';

export default class Menu extends React.PureComponent {

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
        <Link to="/" style={style1}>UserView</Link>
        <Link to="/adminview" style={style1}>AdminView</Link>
      </div>
    );
  }
}

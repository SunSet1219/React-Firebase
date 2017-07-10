import { Link } from 'react-router-dom';
import React from 'react';
import Menu from './menu';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    const style = { textAlign: 'center', marginTop: 20 };
    return (
      <div style={{ textAlign: 'center' }}>
        <Menu />
        <input
          style={style}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div style={style}>
          <Link to={this.state.value === '' ? '/' : `/userview/${this.state.value}`}>
            <button>Do</button>
          </Link>
        </div>

      </div>
    );
  }
}

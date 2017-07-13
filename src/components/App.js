import { Link } from 'react-router-dom';
import React from 'react';
import Menu from './menu';
import fire from '../fire';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        document.location.href = '/';
      }
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChange1(event) {
    this.setState({ input: event.target.value });
  }


  render() {
    const style = { textAlign: 'center', marginTop: 20 };
    return (
      <div style={{ textAlign: 'center' }}>
        <Menu />
        <div>
          <input type="text" style={{ marginTop: 20 }} value={this.state.input} onChange={this.handleChange1} />
        </div>
        <textarea
          rows="8"
          cols="50"
          type="text"
          style={{ marginTop: 20 }}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div style={style}>
          <Link to={this.state.value === '' || this.state.input === '' ? '/' : `/userview/${this.state.value}/${this.state.input}`}>
            <button>Do</button>
          </Link>
        </div>
      </div>
    );
  }
}

import React from 'react';
import Menu from './menu';
import fire from '../fire';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.send = this.send.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    fire.database().ref(`result/${this.props.match.params.key}`).update({unread:true});
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  send() {
    fire.database()
        .ref(`result/${this.props.match.params.key}`)
        .update({ result: this.state.value });
  }
  render() {
    const style = {
      background: '#999',
      width: 200,
      height: 300
    };
    return (
      <div style={{ textAlign: 'center' }}>
        <Menu />
        <h1>
          {this.props.match.params.task}
        </h1>
        <textarea
          style={style}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div>
          <button onClick={this.send}>
                Send
          </button>
        </div>
      </div>
    )
  }
}

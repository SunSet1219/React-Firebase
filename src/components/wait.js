import React from 'react';
import Menu from './menu';
import fire from '../fire';
import axios from 'axios';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '',
      result: '',
      key: '',
      status: 'Do',
      tmr: 0,
      intervalId: '',
      minute: 0
    };
  }
  componentWillMount() {
    clearInterval(this.state.intervalId)
  }
  componentDidMount() {
    axios.get('https://anton1219.herokuapp.com/send', {
      params: {
        title: this.props.match.params.wait,
        contents: this.props.match.params.input
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    const intervalId = setInterval(() => {
    this.setState({
      tmr: this.state.tmr + 1
    });
    }, 1000);
    this.setState({
      intervalId: intervalId
    });
    const myref = fire.database().ref('task').push(this.props.match.params.wait);
    this.setState({
      key: myref.key
    });
    const results = {};
    results[myref.key + ''] = {
      task: this.props.match.params.wait,
      input: this.props.match.params.input,
      result: '',
      unread: false,
      time: new Date().getTime()
    };
    fire.database().ref('result').update(results);
    const starCountRef = fire.database().ref('result');
    starCountRef.on('value', (snapshot) => {
      const resultss = `${snapshot.child(myref.key).child('result').val()}`;
      this.setState({
        result: resultss,
        value: ''
      });
    });
  }
  notifyMe(task, result) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      const notification = new Notification(result, {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/se/se-icon.png',
        body: task,
      });

      notification.onclick = () => {
        window.open('http://localhost:3000/adminview');
      };
    }
  }
  render() {
    const style = {
      textAlign: 'center',
      marginTop: 20
    }
    const style1 = {
      marginTop: 20
    }
    if (this.state.tmr === 60) {
      this.setState({ tmr: 0, minute: this.state.minute + 1 });
    }
    if (this.state.result !== '') {
      this.notifyMe(this.props.match.params.wait, this.state.result);
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Menu />
        <input
          style={style}
          type="text"
          value={this.state.value}
        />
        <div style={style}>
          <button>
            {this.state.result === '' ? 'In Process...' : 'Done'}
          </button>
        </div>
        <div style={style1}>
          <button >
            {this.state.result === '' ? '' : clearInterval(this.state.intervalId)}
                    Waiting since {this.state.minute === 0 ? '' : `${this.state.minute}minutes  and`} {this.state.tmr} seconds
          </button>
        </div>
        <div style={{ width: 400, margin: 'auto' }}>
          {this.state.result}
        </div>
      </div>
    );
  }
}

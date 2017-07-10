import React from 'react';
import Menu from './menu';
import fire from '../fire';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { value: '',
      result: '',
      key: '',
      status: 'Do',
      tmr: 0,
      intervalId: '',
      minute:0
    };   
  }
  componentWillMount() {
    clearInterval(this.state.intervalId)
  }
  componentDidMount() {
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
      result: ''
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
  
  render() {
    const style = {
      textAlign: 'center',
      marginTop: 20
    }
    const style1 = {
      marginTop: 20
    }
    if(this.state.tmr == 60){
      this.setState({ tmr:0, minute:this.state.minute+1 });
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
                    Waiting since {this.state.minute === 0 ? '' : `${this.state.minute}minutes  and`}  {this.state.tmr} seconds
          </button>
        </div>
        <div style={{ width: 400, margin: 'auto' }}>
          {this.state.result}
        </div>
      </div>
    );
  }
}

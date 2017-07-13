import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire';
import Menu from './menu';

const currnetTime = new Date().getTime()
const starCountRef = fire.database().ref('result');

fire.database().ref('result').on('child_added', (snapshot) => {
    console.log(snapshot.val().time);
  if (snapshot.val().time > currnetTime) {
    console.log(snapshot.val());
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    } else {
      const notification = new Notification(snapshot.val().input, {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/se/se-icon.png',
        body: snapshot.val().task,
      });

      notification.onclick = () => {
        window.open('https://alluring-big-bend-92170.herokuapp.com/adminview');
      };
    }
  }
});
export default class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        document.location.href = '/';
      }
    });
  }
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', () => {
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
      }

      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    });
    starCountRef.on('value', (snapshot) => {
      const resultArray = [];
      snapshot.forEach((result) => {
        resultArray.push({
          key: result.key,
          result: result.val().result,
          task: result.val().task,
          unread: result.val().unread,
          input: result.val().input
        });
      });
      this.setState({
        result: resultArray
      });
    });
  }

  render() {
    const style = {
      textAlign: 'center',
    };
    const results = this.state.result;
    const ulStyle = {
      width: 500,
      margin: 'auto'
    }

    return (
      <div style={style}>
        <Menu />
        <ul style={ulStyle}>
          {results.map(data => (
            <li key={data.key}>{data.input} ({data.task})
              <Link
                to={data.result !== '' ? 'adminview' : `adminview/${data.key}/${data.task}/${data.input}`}
                style={{ marginLeft: 30 }}
              >
                {data.unread === false ? 'Please take this' : (data.result === '' ? 'Someone else took it' : 'task done')}
              </Link>
            </li>
                    )) }
        </ul>
      </div>
    );
  }
}

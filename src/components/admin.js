import React from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire';
import Menu from './menu';

export default class Admin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }
  componentWillMount() {
    const starCountRef = fire.database().ref('result');
    starCountRef.on('value', (snapshot) => {
      const resultArray = [];
      snapshot.forEach((result) => {
        resultArray.push({
          key: result.key,
          result: result.val().result,
          task: result.val().task
        });
      })
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
            <li key={data.key}>{data.task}
              <Link
                to={data.result !== '' ? 'adminview' : `adminview/${data.key}/${data.task}`}
                style={{ marginLeft: 30 }}
              >
                {data.result === '' ? 'Please take this' : 'Already taken by others'}
              </Link>
            </li>
                    )) }
        </ul>
      </div>
    );
  }
}

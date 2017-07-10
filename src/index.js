import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/App';
import Admin from './components/admin';
import View from './components/View';
import Wait from './components/wait';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {

  render() {
    const PageNotFound = () => <h1>Uh oh, not found!</h1>;
    return (
      <div>
        <Router >
          <div>
            <Switch>
              <Route
                exact
                path="/"
                component={Main}
              />
              <Route
                exact
                path="/userview/:wait"
                component={Wait}
              />
              <Route
                exact
                path="/adminview/"
                component={Admin}
              />
              <Route
                exact
                path="/adminview/:key/:task"
                component={View}
              />
              <Route
                path="*"
                component={PageNotFound}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

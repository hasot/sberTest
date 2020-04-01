import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { reducers } from './store/reducers';
import './styles/boundle.scss';
import Homepage from './containers/homepage';
import { ROUTING } from './helper/routing';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route component={Homepage} path={ROUTING.main} />
      </Switch>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

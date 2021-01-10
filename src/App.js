import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import Home from './containers/Home';
import Notes from './containers/Notes';
import Login from './containers/Login';
import Registration from './containers/Registration';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './assets/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import jwt from 'jsonwebtoken';
import {setUser} from './redux-store/actions/users-action';
import store from './redux-store/store';

const App = (props) => {
  useEffect(() => {
    const decodeToken = async () => {
      const token = localStorage.getItem('user');
      const decoded = token ? jwt.verify(token, 'secretcode') : {};

      if(decoded && Object.keys(decoded).length !== 0 && decoded.constructor === Object) {
        await store.dispatch(setUser(decoded.data[0]))
      }
    }
    decodeToken();
  },[])

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/registration'>
            <Registration />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/notes'>
            <Notes />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default withRouter(App);

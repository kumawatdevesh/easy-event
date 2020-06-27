import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Auth from './Auth/Auth';
import Service from './Facilities/Service';
import MainHeader from './Header/MainHeader';
import Booking from './Facilities/Booking';
import { connect } from 'react-redux';
import './App.css';

function App(props) {

  let routes;

  if(props.userToken) {
    routes = (
      <Switch>
          <Route path="/booking" component={Booking} />
          <Route path="/" component={Service} />
      </Switch>
    );
  }else {
    routes = (
      <Switch>
          <Route path="/auth" component={Auth} />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <MainHeader />
        {routes}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    userToken: state.userToken
  }
}

export default connect(mapStateToProps, null)(App);
